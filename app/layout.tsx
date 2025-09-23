
import { ReactNode } from 'react';
import Default from "@/layouts/_default/default";
import "@/layouts/global.css";
import Data from '@/data/data';


export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
          <Default data={(await Data())}>
            {children}
          </Default>
        </div>
      </body>
    </html>
  );
};
