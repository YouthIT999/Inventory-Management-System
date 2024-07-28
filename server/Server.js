const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
const uri = "mongodb+srv://mern-book-store:9811049040@cluster0.bdbz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let bookCollections;
let userCollections;

async function run() {
  try {
    await client.connect();
    bookCollections = client.db("BookInventory").collection("books");
    userCollections = client.db("BookInventory").collection("users");

    // Ping the database to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.dir);

// Validation schema
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required()
});

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send('No token provided');
  }
};

// User registration
app.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };

  const result = await userCollections.insertOne(user);
  res.status(201).send(result);
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userCollections.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Upload items  
app.post('/upload-book', authMiddleware, async (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const data = req.body;
  const result = await bookCollections.insertOne(data);
  res.send(result);
});

// Get all books with optional category filter
app.get('/all-books', async (req, res) => {
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }
  const result = await bookCollections.find(query).toArray();
  res.send(result);
});

// Update book
app.patch('/book/:id', authMiddleware, async (req, res) => {
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
});

// Delete book
app.delete('/book/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.deleteOne(filter);
  res.send(result);
});

// Get a single book by ID
app.get('/book/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.findOne(filter);
  res.send(result);
});


// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
