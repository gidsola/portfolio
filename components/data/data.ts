import Mongo from 'mongoconnect-ts';

async function getStaticData(): Promise<SiteData> {
  const
    mongo = new Mongo(`${process.env.MONGO_CSTRING}`, `${process.env.MONGO_DB}`),
    data: any = await mongo.getAll();
  
  return { ...data } as SiteData;
};

const Data = async () => await getStaticData();

export default Data;
