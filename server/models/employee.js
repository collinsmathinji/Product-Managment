const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String },
  employeeImage: { type: Buffer },
  employer: { type: String, ref: 'user', required: true },
}, {
  timestamps: true,
});

const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;
