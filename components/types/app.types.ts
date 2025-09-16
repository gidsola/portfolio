
/**
 * Represents the interface for the database methods.
 */
export interface DatabaseMethodEntity {
  preLaunch(): Promise<boolean>;
  getCommandsByUUID(u: string): Promise<any>;
  getCommandsByAUID(u: string): Promise<any>;
  appendCommandList(a: string, u: string, c: string): Promise<boolean>;
  removeCommand(uuid: string, name: string): Promise<boolean>;
  getEndpoint(u: string): Promise<EndpointPath>;
  logGateway(u: string, c: string): void;
  logProject(a: string, u: string, c: string): Promise<void>;
  addSystemLogEntry(a: string, b: string, c: string): void;
  getProjectLogs(u: string): Promise<any>;
  getActivity(u: string): Promise<any>;
  activity_type(v: string, u: string): void;
  activity_name(v: string, u: string): void;
  activity_url(v: string, u: string): void;
  setTaken(u: string): Promise<boolean>;
  getPid(u: string): Promise<any>;
  setProcess(p: number, a: string, u: string): void;
  removeProcess(p: number): Promise<boolean>;
  setFree(u: string): Promise<boolean>;
  getTemplateById(id: string): Promise<any>;
  getTemplates(): Promise<any>;
  addTemplate(data: any): Promise<boolean>;
  addProject(id: string, data: ProjectStructure, auid: string, uuid: string, clientId: string, secret: string, token: string, active: number, instanced: number): Promise<boolean>;
  updateProjectData(u: string, data: string): Promise<boolean>;
  addProjectApplication(data: any): Promise<boolean>;
  addProjectServer(uuid: string, server_id: string, name: string, icon: string, banner: string, owner_id: string, description: string): void;
  addProjectServersDetail(id: string, detail: string): void;
  getProjectServers(u: string): Promise<any>;
  removeProject(u: string): Promise<boolean>;
  addprojectData(d: string, t: string): Promise<boolean>;
  getProjects(a: string): Promise<ProjectStructure | [ProjectStructure] | [] | null>;
  getProject(u: string): Promise<ProjectStructure | null>;
  getProjectById(id: string): Promise<ProjectStructure | null>;
  getProjectByToken(t: string): Promise<ProjectStructure | null>;
  updateProjectToken(u: string, t: string): Promise<boolean>;
  isActive(u: string): Promise<boolean>;
  setInactive(u: string): Promise<boolean>;
  setActive(u: string): Promise<boolean>;
  createAccount(data: AccountData): Promise<boolean>;
  insertVerificationData(data: VerificationData): Promise<boolean>;
  updateVerificationData(uid: string): Promise<boolean>;
  verifyAccountData(uid: string): Promise<boolean>;
  getAccountByUsername(u: string): Promise<AccountData | null>;
  getAccountByEmail(e: string): Promise<AccountData | null>;
  getAccountByUid(u: string): Promise<AccountData | null>;
  getAccountByAuid(a: string): Promise<AccountData | null>;
  getTierById(id: number): Promise<TierObject>;
  getTier(a: string): Promise<TierObject | null>;
  getToken(u: string): Promise<object>;
  getSpawnables(): Promise<object | []>;
  getAI(u: string): Promise<any>;
  addAI(u: string, d: string): Promise<boolean>;
  removeAI(u: string): Promise<boolean>;
  updateAI(u: string, d: string): Promise<boolean>;
  storeMessages(u: string, c: string): Promise<boolean>;
  getMessages(u: string): Promise<any>;
}

/**
 * Represents the accepted email format.
 */
export type AcceptedEmailFormat = string; // need to use an expression check

/**
 * Represents the data from registration.
 */
export interface RegistrationData {
  userName: string,
  firstName: string,
  lastName: string,
  password?: string | Buffer,
  email: AcceptedEmailFormat,
}

/**
   * Represents a user account.
   */
export interface AccountData extends RegistrationData {
  uid: string,
  auid: string,
  hash: string,
  verified: number,
  tier: number,
  isAdmin: number,
  created_at?: string,
}

/**
 * Represents a tier object.
 */
export interface TierObject {
  id: number,
  name: string,
  projects: number,
  disk_quota: number,
  clients: number,
}


// TODO: do properly
export type VerificationTypeName = "login" | "emailchange" | "resend"
export type VerificationTypeValue = 1 | 2 | 3;
/**
 * Represents the type of verification.  
 * `login - 1`
 * `emailchange - 2`
 * `resend - 3`
 */
export enum VerificationType { "login" = 1, "emailchange" = 2, "resend" = 3 }
//export type isValidVerificationType = (v: VerificationType) => boolean;

/**
 * Represents the data structure for account verification.
 */
export interface VerificationData {
  uid: string,
  messageId: string,
  type: VerificationType,
  sent_on?: Date | string | null,
  verified_on: string | null,
}

/**
   * Represents the data structure of a project.
   */
export interface ProjectStructure {
  id: string,
  data: {
    id: string,
    bot: {
      id: string,
      bot: boolean,
      flags: number,
      avatar: string | null,
      banner: string | null,
      username: string | null,
      global_name: string | null,
      accent_color: string | null,
      banner_color: string | null,
      premium_type: number,
      public_flags: number,
      discriminator: string | null,
      avatar_decoration_data: string | null
    },
    hook: boolean,
    icon: string | null,
    name: string | null,
    team: {
      id: string | null,
      icon: string | null,
      name: string | null,
      members: [],
      owner_user_id: string
    },
    type: null,
    flags: number,
    owner: {
      id: string,
      flags: number,
      avatar: string | null,
      banner: string | null,
      username: string | null,
      global_name: string | null,
      accent_color: string | null,
      banner_color: string | null,
      premium_type: number,
      public_flags: number,
      discriminator: string,
      avatar_decoration_data: string | null
    },
    summary: string | null,
    guild_id: string,
    bot_public: boolean,
    verify_key: string | null,
    cover_image: string | null,
    description: string | null,
    is_monetized: boolean,
    redirect_uris: [string | null],
    integration_public: boolean,
    monetization_state: number,
    verification_state: number,
    interactions_version: number,
    discoverability_state: number,
    rpc_application_state: number,
    bot_require_code_grant: boolean,
    approximate_guild_count: number,
    explicit_content_filter: number,
    store_application_state: number,
    interactions_event_types: [string | null],
    interactions_endpoint_url: string | null,
    creator_monetization_state: number,
    discovery_eligibility_flags: number,
    integration_require_code_grant: boolean,
    monetization_eligibility_flags: number,
    role_connections_verification_url: string | null
  },
  auid: string,
  uuid: string,
  cid: string,
  cs: string,
  token: string,
  active: number,
  instanced: number,
  created_at: string
}


/**
 * Represents an endpoint path if valid and false if invalid.
 */
export type EndpointPath = string | boolean;


