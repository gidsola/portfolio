import type { VerificationData, DatabaseMethodEntity, EndpointPath, ProjectStructure, AccountData, TierObject } from '@/types/app.types';
import { sqlSet } from '@/main/mysql2/connector/Mysql2Connector';

const DatabaseHelper: DatabaseMethodEntity = {
  /**
   * Performs pre-launch tasks.
   * 
   * @returns A Promise that resolves to a boolean indicating whether the pre-launch tasks were successful.
   * @deprecated This method will be removed in the future.
   */
  async preLaunch(): Promise<boolean> {
    try {
      // get all spawnids from db then shut each one down.
      const getPIDquery = 'SELECT pid FROM spawn_pool';
      const pid = await sqlSet(getPIDquery, []);
      console.log("PID:", pid);
      if (Array.isArray(pid) && pid.length > 0) {
        await Promise.all(pid.map(async (p) => {
          try {
            console.log("Killing process:", p.pid);
            process.kill(p.pid, 'SIGKILL');
            await sqlSet('DELETE FROM spawn_pool WHERE pid= ?', [p.pid]);
          } catch (e) {
            console.error("Pre launch error:", e);
            return false;
          }
        }));
      } else {
        try {
          if (pid.pid) {
            console.log("Killing process:", pid.pid);
            process.kill(pid.pid, 'SIGKILL');
            await sqlSet('DELETE FROM spawn_pool WHERE pid= ?', [pid.pid]);
          } else {
            console.log("No processes to kill.");
            return true;
          }
        } catch (e) {
          console.error("Pre launch error:", e);
          return false;
        }
      }
      (await Promise
        .allSettled([
          await sqlSet('DELETE FROM spawn_pool', []),
          await sqlSet('UPDATE projects SET instanced= ? WHERE active= ?', [0, 1])
        ]))
        .forEach((task: PromiseSettledResult<any>) => {
          if (task.status === 'rejected') {
            console.error("Pre launch error:", task.reason);
            return false;
          };
        });
      return true;

    } catch (e) {
      console.error("getPreLaunch() Error:", e);
      return false;
    }
  },


  /***********************************************************************/
  // Commands
  //

  /**
   * Retrieves the commands for a given project.
   * 
   * @param u - The UUID to search for.
   * @returns A Promise that resolves to the retrieved commands.
   */
  async getCommandsByUUID(u: string): Promise<any> {
    try {
      const result: any = await sqlSet('SELECT command FROM commands WHERE uuid= ?', [u]);
      // console.info("result", result);
      return Array.isArray(result) && result.length > 0
        ? result.map((r: any) => JSON.parse(r.command)[0])
        : result.command
          ? JSON.parse(result.command)[0]
          : result;
    } catch (e) { console.error("getCommand() Error:", e); return e; }
  },

  /**
   * Retrieves commands by account.
   * 
   * @param u The AUID to filter commands by.
   * @returns A Promise that resolves to the commands matching the AUID.
   */
  async getCommandsByAUID(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT command FROM commands WHERE auid= ?', [u]);
    } catch (e) { console.error("getCommands() Error:", e); return e; }
  },

  /**
   * Appends a command to the command list.
   * 
   * @param a - The first parameter.
   * @param u - The second parameter.
   * @param c - The third parameter.
   * @returns A promise that resolves to a boolean indicating whether the command was successfully appended.
   */
  async appendCommandList(a: string, u: string, c: string): Promise<boolean> {
    try {
      return (await sqlSet('REPLACE INTO commands VALUES (id, ?, ?, ?)', [a, u, c]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("addCommand() Error:", e); return false; }
  },

  /**
   * Removes a command from the database for a specific project.
   * 
   * @param uuid The UUID of the project.
   * @param name The name of the command to be removed.
   * @returns A promise that resolves to a boolean indicating whether the command was successfully removed.
   */
  async removeCommand(uuid: string, name: string): Promise<boolean> {
    try {
      return (await sqlSet('DELETE FROM commands WHERE uuid= ? AND name=?', [uuid, name]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("removeCommand() Error:", e); return false; }
  },



  /***********************************************************************/
  // Endpoints
  //

  async getEndpoint(u: string): Promise<EndpointPath> {
    try {
      return await sqlSet('SELECT * FROM endpoints WHERE uuid= ?', [u]);
    } catch (e) { console.error("getEndpoint() Error:", e); return false; }
  },


  /***********************************************************************/
  // logging
  //

  logGateway(u: string, c: string): void {
    try {
      sqlSet('INSERT INTO gateway_logs (`uuid`, `content`) VALUES (?, ?)', [u, c]);
    } catch (e) { console.error("logGateway() Error:", e); }
  },

  async logProject(a: string, u: string, c: string): Promise<void> {
    try {
      await sqlSet('INSERT INTO project_logs (`auid`, `uuid`, `content`) VALUES (?, ?, ?)', [a, u, c]);
    } catch (e) { console.error("Project Logging Entry Error:", e); }
  },

  addSystemLogEntry(a: string, b: string, c: string): void {
    try {
      sqlSet('INSERT INTO system_logs (`auid`, `uuid`, `content`) VALUES (?, ?, ?)', [a, b, c]);
    } catch (e) { console.error("System Logging Entry Error:", e); }
  },

  async getProjectLogs(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT * FROM project_logs WHERE uuid= ? ORDER BY timestamp DESC LIMIT 50', [u]);
    } catch (e) { console.error("Project Log Retrieval Error:", e); }
  },

  /***********************************************************************/
  // Activities (botstatus) This will be changing to its own ecosystem
  //

  async getActivity(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT `activity_type`,`activity_name` FROM project_options WHERE uuid= ?', [u]) as any;
    } catch (e) { console.error("getActivity() Error:", e); }
  },

  activity_type(v: string, u: string): void {
    try {
      sqlSet('UPDATE project_options SET `activity_type`= ? WHERE uuid= ?', [v, u]);
    } catch (e) { console.error("activity_type() Error:", e); }
  },

  activity_name(v: string, u: string): void {
    try {
      sqlSet('UPDATE project_options SET `activity_name`= ? WHERE uuid= ?', [v, u]);
    } catch (e) { console.error("activity_name() Error:", e); }
  },

  activity_url(v: string, u: string): void {
    try {
      sqlSet('UPDATE project_options SET `activity_url`= ? WHERE uuid= ?', [v, u]);
    } catch (e) { console.error("activity_url() Error:", e); }
  },


  /***********************************************************************/
  // Processes
  //

  /**
   * Sets the `instanced` flag to 1, indicating that the project is currently running.
   * 
   * @param u The UUID of the project.
   * @returns A promise that resolves to `true` if the update was successful, otherwise `false`.
   */
  async setTaken(u: string): Promise<boolean> {
    try {
      return await sqlSet('UPDATE projects SET `instanced`= 1 WHERE uuid= ?', [u]) ? true : false;
    } catch (e) { console.error("setTaken() Error:", e); return false; }
  },

  /**
   * Retrieves a pid for a project from the spawn_pool table.
   * 
   * @param u The uuid to search for.
   * @returns A Promise that resolves to the pid value.
   */
  async getPid(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT pid FROM spawn_pool WHERE uuid= ?', [u]);
    } catch (e) { console.error("getPid() Error:", e); }
  },

  /**
   * Sets the process in the spawn pool.
   * 
   * @param p - The process ID.
   * @param a - The auid.
   * @param u - The uuid.
   */
  async setProcess(p: number, a: string, u: string): Promise<void> {
    try {
      await sqlSet('INSERT INTO spawn_pool (`pid`, `auid`, `uuid`) VALUES (?, ?, ?)', [p, a, u]);
    } catch (e) { console.error("setProcess() Error:", e); }
  },

  /**
   * Removes a process from the spawn pool.
   * 
   * @param p The process ID to remove.
   * @returns A promise that resolves to a boolean indicating whether the process was successfully removed.
   */
  async removeProcess(p: number): Promise<boolean> {
    try {
      return (await sqlSet('DELETE FROM spawn_pool WHERE pid= ?', [p]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("removeProcess() Error:", e); return false; }
  },

  /**
   * Sets the `instanced` value to 0 for a project, indicating that it is no longer running.
   * 
   * @param u The UUID of the project.
   * @returns A boolean indicating whether the operation was successful.
   */
  async setFree(u: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `instanced`= 0 WHERE uuid= ?', [u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("setFree() Error:", e); return false; }
  },


  /***********************************************************************/
  // Templates
  //

  /**
   * Retrieves a template by ID.
   * 
   * @param id The ID of the template.
   * @returns A promise that resolves to the retrieved template.
   */
  async getTemplateById(id: string): Promise<any> {
    try {
      return await sqlSet('SELECT * FROM templates WHERE id= ?', [id]);
    } catch (e) { console.error("getTemplateById() Error:", e); return e; }
  },

  /**
   * Retrieves all templates.
   * 
   * @returns A promise that resolves to the retrieved templates.
   */
  async getTemplates(): Promise<any> {
    try {
      return await sqlSet('SELECT * FROM templates', []);
    } catch (e) { console.error("getTemplates() Error:", e); return e; }
  },

  /**
   * Adds a new template to the database.
   *
   * @param data The data of the template.
   * @returns A promise that resolves to `true` if the template was successfully added, otherwise `false`.
   */
  async addTemplate(data: {
    uuid: string,
    modelProvider: string,
    selectedModel: string,
    modelApiKey: string,
    prompt: string,
    completionParams: {
      model: string,
      top_p: number,
      max_tokens: number,
      stream: boolean,
      safe_prompt: boolean
    }
  }) {
    try {
      return (await sqlSet('INSERT INTO templates VALUES (id, ?, ?, ?, ?, ?, ?)', [data.uuid, data.modelProvider, data.selectedModel, data.modelApiKey, data.prompt, data.completionParams]))['affectedRows'] === 1 ? true : false;
    } catch (e: any) { throw new Error(e.message || e); }
  },



  /***********************************************************************/
  // Projects
  //

  /**
   * Adds a project to the database.
   * 
   * @param id - The ID of the project.
   * @param data - The data of the project.
   * @param auid - The account associated with the project.
   * @param uuid - The project uuid.
   * @param clientId - The client id'.
   * @param secret - The client secret.
   * @param token - The projects discord bot token.
   * @param active - The status of the project. active = 1, inactive = 0.
   * @param instanced - The spawned status of the project. instanced = 1, not instanced = 0.
   * @returns A promise that resolves to a boolean indicating whether the project was successfully added.
   */
  async addProject(id: string, data: ProjectStructure, auid: string, uuid: string, clientId: string, secret: string, token: string, active: number, instanced: number): Promise<boolean> {
    try {
      return (await sqlSet('INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)', [id, JSON.stringify(data), auid, uuid, clientId, secret, token, active, instanced]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("addProject Error:", e); return false; }
  },

  /**
   * Updates the project data for a given UUID.
   * 
   * @param u The UUID of the project.
   * @param data The new data to be updated.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  async updateProjectData(u: string, data: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `data`= ? WHERE uuid= ?', [JSON.stringify(data), u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("updateProjectData Error:", e); return false; }
  },

  /**
   * Adds a project application to the database.
   * 
   * @param data - The data of the project application.
   * @returns A promise that resolves to a boolean indicating whether the project application was added successfully.
   */
  async addProjectApplication(data: any): Promise<boolean> {
    try {
      return (await sqlSet('INSERT INTO project_application VALUES (?, ?)', [data.id, JSON.stringify(data)]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("addProjectApplication Error:", e); return false; }
  },


  /**
   * Adds a project server to the database.
   * 
   * @param {string} uuid - The UUID of the project server.
   * @param {string} server_id - The ID of the server.
   * @param {string} name - The name of the project server.
   * @param {string} icon - The icon of the project server.
   * @param {string} banner - The banner of the project server.
   * @param {string} owner_id - The ID of the owner.
   * @param {string} description - The description of the project server.
   * @returns {void}
   */
  addProjectServer(
    uuid: string,
    server_id: string,
    name: string,
    icon: string,
    banner: string,
    owner_id: string,
    description: string): void {
    try {
      sqlSet('REPLACE INTO project_servers VALUES (?, ?, ?, ?, ?, ?, ?)', [uuid, server_id, name, icon, banner, owner_id, description]);
    } catch (e) { console.error("addProjectServer Error:", e); }
  },

  addProjectServersDetail(
    id: string,
    detail: string): void {
    try {
      sqlSet('REPLACE INTO project_servers_detail VALUES (?, ?)', [id, detail]);
    } catch (e) { console.error("addprojectServerDetail Error:", e); }
  },

  /**
   * Retrieves a projects servers.
   * 
   * @param u The UUID to search for.
   * @returns A Promise that resolves to the retrieved project servers.
   */
  async getProjectServers(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT * FROM project_servers WHERE uuid= ?', [u]);
    } catch (e) { console.error("getProjectServers Error:", e); }
  },

  /**
   * Removes a project from the platform. This will remove all associated data.
   * 
   * @param u The UUID of the project to remove.
   * @returns A promise that resolves to a boolean indicating whether the project was successfully removed.
   */
  async removeProject(u: string): Promise<boolean> {
    try {
      return (await sqlSet('DELETE FROM projects WHERE uuid= ?', [u]))['affectedRows'] === 1
        // ? (await sqlSetPool('DELETE FROM project_files WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //   ? (await sqlSetPool('DELETE FROM project_environment WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //     ? (await sqlSetPool('DELETE FROM project_access WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //       ? (await sqlSetPool('DELETE FROM project_options WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //         ? (await sqlSetPool('DELETE FROM project_logs WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //           ? (await sqlSetPool('DELETE FROM gateway_logs WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //             ? (await sqlSetPool('DELETE FROM spawn_pool WHERE uuid=' + `'${u}'`))['affectedRows'] === 1
        //               ? true : false : false : false : false : false : false : false : false;
        ? true : false;
    } catch (e) { console.error("removeProject() Error:", e); return false; }
  },

  async addprojectData(d: string, t: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `data`= ? WHERE token= ?', [d, t]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("addprojectData() Error:", e); return false; }
  },

  async getProjects(a: string): Promise<ProjectStructure | [ProjectStructure] | [] | null> {
    try {
      return await sqlSet('SELECT * FROM projects WHERE auid= ?', [a]);
    } catch (e) { console.error("getProjects sql func Error:", e); return null; }
  },

  async getProject(u: string): Promise<ProjectStructure | null> {
    try {
      return await sqlSet('SELECT * FROM projects WHERE uuid= ?', [u]);
    } catch (e) { console.error("getProject sql func Error:", e); return null; }
  },

  async getProjectById(id: string): Promise<ProjectStructure | null> {
    try {
      return await sqlSet('SELECT * FROM projects WHERE id= ?', [id]);
    } catch (e) { console.error("getProjectById sql func Error:", e); return null; }
  },

  async getProjectByToken(t: string): Promise<ProjectStructure | null> {
    try {
      return await sqlSet('SELECT * FROM projects WHERE token= ?', [t]);
    } catch (e) { console.error("getProjectByToken sql func Error:", e); return null; }
  },

  async updateProjectToken(u: string, t: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `token`= ? WHERE uuid= ?', [t, u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("updateProjectToken() Error:", e); return false; }
  },

  /**
   * 
   * @param u Project UUID
   */
  async isActive(u: string): Promise<boolean> {
    try {
      return (await sqlSet('SELECT active FROM projects WHERE uuid= ?', [u]))['active'] === 1 ? true : false;
    } catch (e) { console.error("isActive() Error:", e); return false; }
  },

  /**
   * 
   * @param u Project UUID
   */
  async setInactive(u: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `active`= 0 WHERE uuid= ?', [u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("setInactive Error:", e); return false; }
  },

  /**
   * 
   * @param u Project UUID
   */
  async setActive(u: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE projects SET `active`="1" WHERE uuid= ?', [u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("setActive Error:", e); return false; }
  },




  /***********************************************************************/
  // Accounts (users)
  //

  async createAccount(data: AccountData): Promise<boolean> {
    try {
      return (await sqlSet('INSERT INTO accounts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        //uid,         auid,  data.userName, data.firstName, data.lastName, hashed, data.email, 0, 0, 0
        [data.uid, data.auid, data.userName, data.firstName, data.lastName, data.hash, data.email, data.verified, data.tier, data.isAdmin]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("createAccount() Error:", e); return false; }
  },

  async insertVerificationData(data: VerificationData): Promise<boolean> {
    try {
      const
        query = "INSERT INTO verification VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)",
        values = [data.uid, data.messageId, data.type, data.verified_on],
        result = await sqlSet(query, values);

      return result['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("verifyAccount() Error:", e); return false; }
  },

  async updateVerificationData(uid: string): Promise<boolean> {
    try {
      return (await sqlSet("UPDATE verification SET verified_on = CURRENT_TIMESTAMP WHERE uid = ?", [uid]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("updateVerificationData() Error:", e); return false; }
  },

  async verifyAccountData(uid: string): Promise<boolean> {
    try {
      return (await sqlSet("UPDATE accounts SET verified = 1 WHERE uid = ?", [uid]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("verifyAccountData() Error:", e); return false; }
  },

  async getAccountByUsername(u: string): Promise<AccountData | null> {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE username= ?', [u]);
    } catch (e) { console.error("getAccountByUsername:", e); return null; }
  },

  async getAccountByEmail(e: string): Promise<AccountData | null> {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE email= ?', [e]);
    } catch (e) { console.error("getAccountByEmail:", e); return null; }
  },

  async getAccountByUid(u: string): Promise<AccountData | null> {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE uid= ?', [u]);
    } catch (e) { console.error("getAccountByUid:", e); return null; }
  },

  async getAccountByAuid(a: string): Promise<AccountData | null> {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE auid= ?', [a]);
    } catch (e) { console.error("getAccountByAuid:", e); return null; }
  },



  /***********************************************************************/
  // Tiers
  //

  /**
   * 
   * @param id Unique Tier ID
   */
  async getTierById(id: number): Promise<TierObject> {
    try {
      return await sqlSet('SELECT * FROM tiers WHERE id= ?', [id]);
    } catch (e) { console.error("getTiers:", e); throw e; }
  },

  /**
   * 
   * @param a Unique Account ID (auid)
   */
  async getTier(a: string): Promise<TierObject | null> {
    try {
      return await sqlSet('SELECT * FROM tiers WHERE id IN (SELECT tier FROM accounts WHERE auid= ?)', [a]);
    } catch (e) { console.error("getTier:", e); return null }
  },



  /***********************************************************************/
  // 👾 Misc 👾
  //

  async getToken(u: string): Promise<object> {
    try {
      return await sqlSet('SELECT `token` FROM projects WHERE uuid= ?', [u]);
    } catch (e) { console.error("getToken() Error:", e); return { e }; }
  },

  async getSpawnables(): Promise<object | []> {
    try {
      return await sqlSet(
        'SELECT accounts.auid, projects.uuid FROM accounts INNER JOIN projects ON projects.auid=accounts.auid WHERE projects.active=1 AND projects.instanced=0',
        []
      );
    } catch (e) { console.error("getSpawnables() Error:", e); return { e }; }
  },


  /***********************************************************************/
  // AI (Artificial Intelligence)

  async getAI(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT * FROM ai WHERE uuid= ?', [u]);
    } catch (e) { console.error("getAI() Error:", e); return e; }
  },

  async addAI(u: string, d: string): Promise<boolean> {
    try {
      return (await sqlSet('INSERT INTO ai VALUES (?, ?)', [u, d]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("addAI() Error:", e); return false; }
  },

  async removeAI(u: string): Promise<boolean> {
    try {
      return (await sqlSet('DELETE FROM ai WHERE uuid= ?', [u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("removeAI() Error:", e); return false; }
  },

  async updateAI(u: string, d: string): Promise<boolean> {
    try {
      return (await sqlSet('UPDATE ai SET `data`= ? WHERE uuid= ?', [d, u]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("updateAI() Error:", e); return false; }
  },

  /**
   * Stores messages in the database.
   * 
   * @param u - The user.
   * @param c - The message content.
   * @returns A promise that resolves to a boolean indicating whether the messages were successfully stored.
   */
  async storeMessages(u: string, c: string): Promise<boolean> {
    try {
      return (await sqlSet('INSERT INTO ai_messages VALUES (?, ?)', [u, c]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("storeMessages() Error:", e); return false; }
  },


  /**
   * Retrieves messages from the database for a given user.
   * 
   * @param u The user ID.
   * @returns A promise that resolves to an array of messages.
   */
  async getMessages(u: string): Promise<any> {
    try {
      return await sqlSet('SELECT content FROM ai_messages WHERE userid= ? ORDER BY id DESC LIMIT 2', [u]);
    } catch (e) { console.error("getMessages() Error:", e); return e; }
  },


};

export default DatabaseHelper;

// declare global {
//   const Sql: typeof SqlExecute;
// }
