const { userCollections } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

exports.registerUser = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };

    const result = await userCollections.insertOne(user);
    res.status(201).send(result);
  }
];

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userCollections.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};
