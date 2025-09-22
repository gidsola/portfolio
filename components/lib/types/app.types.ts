// app pages

/**
 * Header
 */
type NavLinks = [string, string][]
interface HeaderPageData {
  navlinks: NavLinks;
};

/**
 * About
 */
type Skills = string[];
interface AboutPageData {
  skills: Skills;
};

/**
 * Projects
 */
type Repos = { url: string }[];
interface ProjectPageData {
  repos: Repos;
};

/**
 * Services
 */
type Service = {
  title: string;
  description: string;
  technologies: string[],
  icon: string;
}[];
interface ServicesPageData {
  intro: string;
  offered: Service
};

/**
 * Secret
 */
type Scripts = {
  title: string;
  code: string;
  description: string;
}[];
interface EggPageData {
  scripts: Scripts;
};

/**
 * SiteData
 */
interface SiteData {
  projects: ProjectPageData;
  header: HeaderPageData;
  about: AboutPageData;
  services: ServicesPageData;
  egg: EggPageData;
};
