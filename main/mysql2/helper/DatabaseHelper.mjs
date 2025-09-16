import { sqlSet } from '../connector/Mysql2Connector.mjs';

const DatabaseHelper = {

  /***********************************************************************/
  // logging
  //
  logGateway(/**@type{string}*/u, /**@type{string}*/c) {
    try {
      sqlSet('INSERT INTO gateway_logs (`uuid`, `content`) VALUES (?, ?)', [u, c]);
    }
    catch (e) {
      console.error("logGateway() Error:", e);
    }
  },
  async logProject(/**@type{string}*/a, /**@type{string}*/u, /**@type{string}*/c) {
    try {
      await sqlSet('INSERT INTO project_logs (`auid`, `uuid`, `content`) VALUES (?, ?, ?)', [a, u, c]);
    }
    catch (e) {
      console.error("Project Logging Entry Error:", e);
    }
  },
  addSystemLogEntry(/**@type{string}*/a, /**@type{string}*/b, /**@type{string}*/c) {
    try {
      sqlSet('INSERT INTO system_logs (`auid`, `uuid`, `content`) VALUES (?, ?, ?)', [a, b, c]);
    }
    catch (e) {
      console.error("System Logging Entry Error:", e);
    }
  },
  async getProjectLogs(/**@type{string}*/u) {
    try {
      return await sqlSet('SELECT * FROM project_logs WHERE uuid= ? ORDER BY timestamp DESC LIMIT 50', [u]);
    }
    catch (e) {
      console.error("Project Log Retrieval Error:", e);
    }
  },


  /***********************************************************************/
  // Accounts (users)
  //
  async createAccount(/**@type {any}*/data) {
    try {
      return (await sqlSet('INSERT INTO accounts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [data.uid, data.auid, data.userName, data.firstName, data.lastName, data.hash, data.email, data.verified, data.tier, data.isAdmin]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("createAccount() Error:", e); return false; }
  },
  async insertVerificationData(/**@type {any}*/data) {
    try {
      const
        query = "INSERT INTO verification VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)",
        values = [data.uid, data.messageId, data.type, data.verified_on],
        result = await sqlSet(query, values);

      return result['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("verifyAccount() Error:", e); return false; }
  },

  async updateVerificationData(/**@type {string}*/uid) {
    try {
      return (await sqlSet("UPDATE verification SET verified_on = CURRENT_TIMESTAMP WHERE uid = ?", [uid]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("updateVerificationData() Error:", e); return false; }
  },
  async verifyAccountData(/**@type {string}*/uid) {
    try {
      return (await sqlSet("UPDATE accounts SET verified = 1 WHERE uid = ?", [uid]))['affectedRows'] === 1 ? true : false;
    } catch (e) { console.error("verifyAccountData() Error:", e); return false; }
  },
  async getAccountByUsername(/**@type {string}*/u) {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE username= ?', [u]);
    }
    catch (e) {
      console.error("getAccountByUsername:", e);
      return null;
    }
  },
  async getAccountByEmail(/**@type {string}*/e) {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE email= ?', [e]);
    }
    catch (e) {
      console.error("getAccountByEmail:", e);
      return null;
    }
  },
  async getAccountByUid(/**@type {string}*/u) {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE uid= ?', [u]);
    }
    catch (e) {
      console.error("getAccountByUid:", e);
      return null;
    }
  },
  async getAccountByAuid(/**@type {string}*/a) {
    try {
      return await sqlSet('SELECT * FROM accounts WHERE auid= ?', [a]);
    }
    catch (e) {
      console.error("getAccountByAuid:", e);
      return null;
    }
  },
  
  /***********************************************************************/
  // Tiers
  //
  /**
   *
   * @param id Unique Tier ID
   */
  async getTierById(/**@type {string}*/id) {
    try {
      return await sqlSet('SELECT * FROM tiers WHERE id= ?', [id]);
    }
    catch (e) {
      console.error("getTiers:", e);
      throw e;
    }
  },
  /**
   *
   * @param a Unique Account ID (auid)
   */
  async getTier(/**@type {string}*/a) {
    try {
      return await sqlSet('SELECT * FROM tiers WHERE id IN (SELECT tier FROM accounts WHERE auid= ?)', [a]);
    }
    catch (e) {
      console.error("getTier:", e);
      return null;
    }
  },

};
export default DatabaseHelper;
