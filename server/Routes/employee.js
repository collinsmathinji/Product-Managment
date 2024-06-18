const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Employer = require('../models/user');
const User = require('../models/user');
router.post('/add', async (req, res) => {
  try {
    const { name, email, position, employerId } = req.body;
    
    const employer = await User.findById(employerId);
   

    const newEmployee = new Employee({
      name,
      email,
      position,
      employer: employerId,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

)
router.get('/employers', async (req, res) => {
    try {
      const employers = await User.find();
      res.status(200).json(employers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
;

module.exports = router;
