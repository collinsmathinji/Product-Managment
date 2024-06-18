const express = require('express');
const {  Transaction } = require('../models/transactions');
const router = express.Router();

router.post('/take', async (req, res) => {
  const { employeeId, items } = req.body; 
  const transactionDate = new Date();
  try {
    for (const item of items) {
      const transaction = new Transaction({
        employeeId,
        itemId: item.itemId,
        quantityTaken: item.quantityTaken,
        transactionDate,
      });
      await transaction.save();
    }
    res.status(201).json({ message: 'Items taken recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/return', async (req, res) => {
  const { employeeId, items } = req.body; 
  try {
    for (const item of items) {
      const transaction = await Transaction.findOne({
        employeeId,
        itemId: item.itemId,
        transactionDate: new Date(),
      });
      if (transaction) {
        transaction.quantityReturned += item.quantityReturned;
        await transaction.save();
      }
    }
    res.status(200).json({ message: 'Items returned recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/unaccounted/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  try {
    const unaccounted = await Transaction.find({
      employeeId,
      quantityReturned: { $lt: '$quantityTaken' },
    }).populate('itemId');
    res.json(
      unaccounted.map((t) => ({
        item: t.itemId.name,
        unaccountedQuantity: t.quantityTaken - t.quantityReturned,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
