const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  lat: Number,
  lng: Number,
  assignedDriverId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
