import { ReactNode } from "react";
import Header from "@/layouts/_default/defaultheader";


export default function Default({ children, data }: { children: ReactNode, data: SiteData }) {
  return (
    <>
      <Header header={data["header"]} />
      <>
        {children}
      </>
    </>
  );
};
