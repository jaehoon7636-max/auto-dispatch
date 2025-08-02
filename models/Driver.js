const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  driverId: String,
  lat: Number,
  lng: Number,
  status: { type: String, enum: ['available', 'busy'], default: 'available' },
  rating: { type: Number, default: 5.0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Driver', DriverSchema);