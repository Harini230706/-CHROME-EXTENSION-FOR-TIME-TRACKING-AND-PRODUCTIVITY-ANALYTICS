const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  hostname: String,
  timeSpent: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserData', schema);