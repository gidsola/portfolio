import {ReactNode} from 'react';
import Default from "@/layouts/_default/default";
import "@/layouts/global.css";

// import { auth } from '@/auth'

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const session = await auth();
  
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
            <Default >
              {children}
            </Default>
        </div>
      </body>
    </html>
  );
};
