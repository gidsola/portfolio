import { MongoClient, MongoServerError, ReadPreference } from 'mongodb';

class MongoConnect {

  /**
   * The url or "Connection String" should follow formats as specified at:
   * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
   * 
   * @param {string} url connection string
   * @param {string | null} db database name to use if not specifying in connection string
   */
  constructor(url, db = null) {
    if (!url) throw new Error("Missing connection string.");

    this.url = this.isMongoString(url);
    this.client = new MongoClient(this.url);
    this.db = db !== null
      ? this.client.db(db)
      : this.client.db();

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

};


class Mongo extends MongoConnect {

  /**
   * The url or "Connection String" should follow formats as specified at:
   * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
   * 
   * @param {string} url connection string
   * @param {string | null} db database name to use if not specifying in connection string
   */
  constructor(url, db = null) {
    db === null
      ? super(url)
      : super(url, db);
  }

  /**
   * Creates a collection with schema validation.
   * 
   * @see https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#specify-json-schema-validation
   * 
   * @param {string} collection collection name to use when creating
   * @param {Object<any>} schema validator object
   * @returns the successfully created collection
   */
  async createSchemaCollection(collection, schema) {
    try {
      return await this.db.createCollection(collection, schema);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to create collection!")
    }
  };

  /**
   * create a validation schema from an Object
   */
  async createSchemaFromObject(){
    //maybe not for this project.
  }

  /**
   * @returns a client object
   * @deprecated i'm not likely to use this anymore.
   */
  async getClient() {
    return this.client;
  };

};
export default Mongo;













/*
 *          TESTING GROUNDS
 *       dont forget to rem before using class...
 */

// import { students } from './schemas/students.mjs' // test object from docs

// const mongo = new Mongo("mongodb://localhost:27017", 'mine');
// const mongo = new Mongo("mongodb://localhost:27017");// no db in connection string uses 'test' by default.

// try {

//   await mongo.createSchemaCollection('students', students);
  // console.log(collection);
  // console.log(mongo.client.eventNames()); // returns array of eventsbeing listened for. comes stock with the error event.  xD

  
  // /**
  //  * @type {ReadPreference}
  //  */
  // const
  //   readPreference/*: ReadPreference*/ = [{
  //     mode: 'primary',
  //     // tags: undefined,
  //     // hedge: undefined,
  //     // maxStalenessSeconds: undefined,
  //     // minWireVersion: undefined
  //   }],

  //   dbOptions = {
  //     raw: false,
  //     useBigInt64: false,
  //     promoteLongs: true,
  //     promoteValues: true,
  //     promoteBuffers: false,
  //     ignoreUndefined: false,
  //     bsonRegExp: false,
  //     serializeFunctions: false, // TODO: explore. does this actually keep functions in objects ?? and does it auto deserialize when grabbing datas?
  //     fieldsAsRaw: {}, // empty by default.
  //     enableUtf8Validation: true,
  //     timeoutMS: 5000,
  //     readPreference // readPreference: [ReadPreference]
  //   },
  //   collection = mongo.client.db('local', dbOptions).collection('students');

  // console.log("Collection Output: ", collection);

  // uncomment both inserts to trigger mangoserver error catch, just one to make loggables
  // await collection.insertOne({ _id: 1, label: "title" });
  // await collection.insertOne({ _id: 1, label: "title" });

  // this only errs if duplicate is sequential. later added duplicates seem to get a new object id.. 
  // TODO: look deeper and make insert handler to manage this if needed.
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

  // const findResult = await collection.find().toArray();// didnt need the empty object
  // console.log('Found documents =>', findResult);

  // mongo.client.close();

// }
// catch (e) {
//   if (e instanceof MongoServerError)// only doing this over a ternary because the docs mention it specifically.(errmsg only exists on MongoServerError)
//     console.log("NOPE", e.errmsg);
//   else console.log("NOPE", e);
// };

// mongo.client.close();