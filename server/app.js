const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticateJWT = require('./middleware/auth');
const itemRoutes = require('./Routes/item');
const authRoutes = require('./Routes/auth');
const transactionRoutes = require('./Routes/transactions');
const employeeRoutes = require('./Routes/employee');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));


app.use('/api/items', authenticateJWT, itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/employees', employeeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
