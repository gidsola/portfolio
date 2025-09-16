import {ReactNode} from 'react';
import Default from "@/layouts/_default/default";
// import { auth } from '@/auth'

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const session = await auth();  
  const session = "pass";
  
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
