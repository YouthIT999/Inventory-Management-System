const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "your_mongo_uri";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let userCollections;

async function connectDB() {
  if (!userCollections) {
    await client.connect();
    userCollections = client.db("BookInventory").collection("users");
  }
}

module.exports = {
  connectDB,
  userCollections
};
