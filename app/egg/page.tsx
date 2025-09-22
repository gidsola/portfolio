import Egg from "@/app/egg/egg";
import Data from '@/data/data';

export default async function EggPage() {
  return (
    <Egg pageData={(await Data()).egg} />
  );
};
