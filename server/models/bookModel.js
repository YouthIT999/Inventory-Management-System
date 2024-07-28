const Joi = require('joi');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = "your_mongo_uri";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let bookCollections;

async function connectDB() {
  if (!bookCollections) {
    await client.connect();
    bookCollections = client.db("BookInventory").collection("books");
  }
}

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required()
});

module.exports = {
  connectDB,
  bookCollections,
  bookSchema
};
