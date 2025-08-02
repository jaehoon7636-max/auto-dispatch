const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.post('/location', async (req, res) => {
  const { driverId, lat, lng, status } = req.body;
  const driver = await Driver.findOneAndUpdate(
    { driverId },
    { lat, lng, status, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  res.json(driver);
});

router.get('/', async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

module.exports = router;