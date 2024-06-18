const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();

const secret = process.env.JWT_SECRET;


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({email});
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.json({ token,email });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
