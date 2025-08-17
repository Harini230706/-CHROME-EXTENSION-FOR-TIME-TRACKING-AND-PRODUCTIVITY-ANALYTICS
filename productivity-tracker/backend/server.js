const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trackerRoutes = require('./routes/tracker');

// ✅ Load environment variables
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use routes
app.use('/api', trackerRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(3000, () => {
      console.log('🚀 Backend running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });