import Projects from "@/app/projects/projects";
import Data from '@/data/data';

export default async function ProjectsPage() {
  const data = await Data();
  return (
    <Projects pageData={(await Data()).projects} />
  );
};
