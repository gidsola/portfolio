import Projects from "@/app/projects/projects";
import Data from '@/data/data';

export default async function ProjectsPage() {
  const
    projectsPageData = (await Data()).projects,
    githubProjects: GithubProject[] = [];

  for await (const repo of projectsPageData.repos) {
    const response = await fetch(repo.url, {
      method: 'GET',
      headers: {
        //https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28
        "Authorization": `Bearer ${process.env.GITHUB_PAT}`,
        "X-GitHub-Api-Version": `${process.env.GITHUB_API_VERSION}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch');
    githubProjects.push((await response.json()) as GithubProject);
  }

  return (
    <Projects pageData={{ ...projectsPageData, projects: githubProjects }} />
  );
};
