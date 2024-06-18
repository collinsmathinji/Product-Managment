const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantityTaken: {
    type: Number,
    required: true,
  },
  quantityReturned: {
    type: Number,
    default: 0,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
