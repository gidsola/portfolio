import { MongoClient, MongoServerError } from 'mongodb';


class MongoConnect {
  /**
   * @private
   */
  client;

  /**
   * The url or "Connection String" should follow formats as specified at:
   * https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
   * 
   * @param {string} url 
   */
  constructor(url) {
    if (!url) throw new Error("Missing Constructor arg");

    this.url = this.isMongoString(url);
    this.client = new MongoClient(this.url);

  }

  /**
   * @param {string} s 
   * @private
   */
  isMongoString(s) {
    if (s.startsWith("mongodb+srv://") || s.startsWith("mongodb://"))
      return s;
    throw new Error("Unrecognized connection string..");
  };

  /**
   * 
   * @returns an instantiated client object
   */
  async getClient() {
    return this.client;
  };

};
export default MongoConnect;



/*
 *          TESTING GROUNDS
 */

// const client = await (new MongoConnect("localhost:27017")).getClient(); // Errors as expected.
const client = await (new MongoConnect("mongodb://localhost:27017")).getClient();

try {
  await client.connect();

  const dbOptions = {
    raw: false,
    useBigInt64: false,
    promoteLongs: true,
    promoteValues: true,
    promoteBuffers: false,
    ignoreUndefined: false,
    bsonRegExp: false,
    serializeFunctions: false, // explore. does this actually keep functions in objects ?? and does it auto deserialize when grabbing datas?
    // fieldsAsRaw: {}, // commented until i know what it does.
    enableUtf8Validation: true,
    timeoutMS: 5000, // didnt like the undefined
    // readPreference: [ReadPreference]  //look in source. uncomment to test non-mangoserver error catch
  };
  const collection = client.db('local', dbOptions).collection('local');

  // uncomment both inserts to trigger mangoserver error catch
  // await collection.insertOne({ _id: 1, label: "title" });
  // await collection.insertOne({ _id: 1, label: "title" });

  // this only errs if duplicate is sequential. later added duplicates seem to get a new object id.. 
  // look deeper and make insert handler to manage this if needed.
  //    },
  //    {
  //      _id: new ObjectId('68c9b7c156eb17a2b998fcec'),
  //      id: 1,
  //      label: 'title'
  //    },
  //    {
  //      _id: new ObjectId('68c9b93af4f6bbb806ae0f21'),
  //      id: 1,
  //      label: 'title'
  //    },

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  client.close();
}
catch (e) {
  if (e instanceof MongoServerError)// only doing this over a ternary because the docs mention it specifically.(errmsg only exists on MongoServerError)
    console.log("NOPE", e.errmsg);
  else console.log("NOPE", e);
};
client.close();

