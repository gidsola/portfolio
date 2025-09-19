import { ReactNode } from 'react';
import Default from "@/layouts/_default/default";
import "@/layouts/global.css";
// import { auth } from '@/auth'
import Mongo from '@/main/mongodb/MongoConnect.mjs';

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const session = await auth();
  const
    mongo = new Mongo("mongodb://localhost:27017", "portfolio"),
    datas = await mongo.db.collections(),
    pages = (await datas[0].find().toArray())[0].headpages;

  mongo.client.close();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
          <Default pages={pages}>
            {children}
          </Default>
        </div>
      </body>
    </html>
  );
};
