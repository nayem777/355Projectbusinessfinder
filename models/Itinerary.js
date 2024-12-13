const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  locations: [{
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    arrivalTime: Date,
    departureTime: Date
  }],
  optimizedRoute: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }]
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);

