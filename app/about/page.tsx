import About from "@/app/about/about";
import Data from '@/data/data';

export default async function AboutPage() {
  return (
    <About pageData={(await Data()).about} />
  );
};
