
/**
 * Represents the interface for the database methods.
 */
export interface DatabaseMethodEntity {
  
  logGateway(u: string, c: string): void;
  logProject(a: string, u: string, c: string): Promise<void>;
  addSystemLogEntry(a: string, b: string, c: string): void;
  
  createAccount(data: AccountData): Promise<boolean>;
  getAccountByUsername(u: string): Promise<AccountData | null>;
  getAccountByEmail(e: string): Promise<AccountData | null>;
  getAccountByUid(u: string): Promise<AccountData | null>;
  getAccountByAuid(a: string): Promise<AccountData | null>;
  
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
