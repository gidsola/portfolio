import Mongo from '@/main/mongodb/MongoConnect.mjs';

async function getStaticData(): Promise<SiteData> {
  const
    mongo = new Mongo("mongodb://localhost:27017", "portfolio"),// this should be an env or config
    datas = await mongo.db.collections(),
    data: any = [];

  for await (const collection of datas) {
    const
      c = (await collection.find().toArray()),
      pn = collection.collectionName;
      for (const k of c) {
        data[pn] = {...data[pn], [Object.entries(k)[1][0]]: Object.entries(k)[1][1]};
      };
  };
  
  return { ...data } as SiteData;
};

const Data = async () => await getStaticData();

export default Data;
