import About from "@/components/app/about/about";
import Data from '@/components/data/data';

export default async function AboutPage() {
  return (
      <About pageData={(await Data()).about} />
  );
};
