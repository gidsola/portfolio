import Services from "@/app/services/services";
import Data from '@/data/data';

export default async function ServicesPage() {
  return (
    <Services pageData={(await Data()).services} />
  );
};
