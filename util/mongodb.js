
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://loganabhi5211:YhIPDYzYtVWCwNYb@cluster0.oqfthj5.mongodb.net/?retryWrites=true&w=majority";

let _db;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDb=  async (cb)=> {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const clientdb = await client.connect();
    _db=clientdb.db('shop');
    cb(clientdb);
  }
  catch(e){
    console.log(e);
    cb(null);
  }
}

const getDb =  ()=>{
  if(_db) return _db;
  throw 'No Database Found!';
}

module.exports.connectDb = connectDb;
module.exports.getDb = getDb;