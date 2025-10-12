import Services from "@/components/app/services/services";
import Data from '@/components/data/data';

export default async function ServicesPage() {
  return (
    <Services pageData={(await Data()).services} />
  );
};
