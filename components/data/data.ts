
import Mongo from '@/main/mongodb/MongoConnect.mjs';

async function getStaticData(): Promise<SiteData> {
  const
    mongo = new Mongo("mongodb://localhost:27017", "portfolio"),
    datas = await mongo.db.collections(),
    data: any = [];

  for await (const collection of datas) {
    const
      c = (await collection.find().toArray())[0],
      pn = collection.collectionName,
      k = Object.keys(c)[1],
      v = Object.entries(c)[1];

    data[pn] = { [k]: v[1] };
  };
  console.log("DATAS", data);
  return { ...data } as SiteData;
};

const Data = async () => await getStaticData();

export default Data;
