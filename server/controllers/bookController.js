const { bookCollections, bookSchema } = require('../models/bookModel');
const { ObjectId } = require('mongodb');

exports.uploadBook = async (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const data = req.body;
  const result = await bookCollections.insertOne(data);
  res.send(result);
};

exports.getAllBooks = async (req, res) => {
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }
  const result = await bookCollections.find(query).toArray();
  res.send(result);
};

exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      ...updateBookData
    },
  };
  const options = { upsert: true };

  const result = await bookCollections.updateOne(filter, updatedDoc, options);
  res.send(result);
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.deleteOne(filter);
  res.send(result);
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.findOne(filter);
  res.send(result);
};
