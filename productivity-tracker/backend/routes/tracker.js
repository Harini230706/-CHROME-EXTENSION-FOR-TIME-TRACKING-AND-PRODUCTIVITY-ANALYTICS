const express = require('express');
const router = express.Router();
const UserData = require('../models/userData');

router.post('/log', async (req, res) => {
  const { hostname, timeSpent } = req.body;
  await UserData.create({ hostname, timeSpent });
  res.sendStatus(200);
});

router.get('/data', async (req, res) => {
  const entries = await UserData.find({});
  const result = {};
  for (const entry of entries) {
    result[entry.hostname] = (result[entry.hostname] || 0) + entry.timeSpent;
  }
  res.json(result);
});

module.exports = router;