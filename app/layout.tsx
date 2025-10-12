import Default from "@/layouts/_default/default";
import "@/css/global.css"; 
import Data from '@/components/data/data';
import { metadata } from '@/components/metadata/metadata';
// import { Metadata } from 'next';
export {metadata}

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Goodsie Dot C Eh",
//     default:'Goodsie Dot C Eh'
//   }
// };

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body >
        <div>
          <Default data={(await Data())}>
            {children}
          </Default>
        </div>
      </body>
    </html>
  );
};
