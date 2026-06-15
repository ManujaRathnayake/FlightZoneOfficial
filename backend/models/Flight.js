const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airportCode: { type: String, required: true }, // CMB හෝ HRI
  type: { type: String, required: true },        // arrivals හෝ departures
  flightNumber: String,
  airline: String,
  aircraft: String,
  status: String,
  time: Date,                                    // ප්ලේන් එක එන/යන වෙලාව
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', FlightSchema);