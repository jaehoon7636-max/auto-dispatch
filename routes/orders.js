const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Driver = require('../models/Driver');
const { spawn } = require('child_process');
const path = require('path');

function callDispatchPython(order, drivers) {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', [path.join(__dirname, '../../ai/dispatch.py')]);

    const input = JSON.stringify({ order, drivers });
    py.stdin.write(input);
    py.stdin.end();

    let data = '';
    py.stdout.on('data', chunk => { data += chunk; });
    py.stderr.on('data', err => console.error("Python error:", err.toString()));
    py.on('close', () => {
      try {
        const result = JSON.parse(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}

router.post('/', async (req, res) => {
  const { orderId, lat, lng } = req.body;
  const order = await Order.create({ orderId, lat, lng });
  const drivers = await Driver.find();
  const bestDriver = await callDispatchPython(order, drivers);

  if (bestDriver) {
    order.assignedDriverId = bestDriver.driverId;
    await order.save();
    await Driver.updateOne({ driverId: bestDriver.driverId }, { status: 'busy' });
  }

  res.json({ order, assignedDriver: bestDriver });
});

module.exports = router;
