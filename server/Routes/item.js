const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/items');
const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create a new item
router.post('/create', upload.single('itemImage'), async (req, res) => {
  try {
    const newItem = new Item({
      itemImage: req.file.path,
      itemName: req.body.itemName,
      description: req.body.description,
      numberOfItems: req.body.numberOfItems,
      itemBuyingPrice: req.body.itemBuyingPrice,
      itemSellingPrice: req.body.itemSellingPrice,
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
