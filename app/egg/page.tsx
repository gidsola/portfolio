import Egg from "@/components/app/egg/egg";
import Data from '@/components/data/data';

export default async function EggPage() {
  return (
    <Egg pageData={(await Data()).egg} />
  );
};
