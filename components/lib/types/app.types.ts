
/**
 * Represents the accepted email format.
 */
type AcceptedEmailFormat = string; // need to use a check

/**
 * Represents the data from registration.
 */
interface RegistrationData {
  userName: string,
  firstName: string,
  lastName: string,
  password?: string | Buffer,
  email: AcceptedEmailFormat,
}

/**
   * Represents a user account.
   */
interface AccountData extends RegistrationData {
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
interface TierObject {
  id: number,
  name: string,
  projects: number,
  disk_quota: number,
  clients: number,
}


/**
 * app pages
 */

type NavLinks = [string, string][]
interface HeaderPageData {
  navlinks: NavLinks;
};


type Skills = string[];
interface AboutPageData {
  skills: Skills;
};


type Repos = { url: string }[];
interface ProjectPageData {
  repos: Repos;
};



type script = {
  title: string;
  code: string;
  description: string;
};



interface SiteData {
  projects: ProjectPageData;
  header: HeaderPageData;
  about: AboutPageData;
};
