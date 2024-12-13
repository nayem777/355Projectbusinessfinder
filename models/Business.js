const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  category: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  priceLevel: { type: String, enum: ['$', '$$', '$$$', '$$$$'] },
  description: String,
  phone: String,
  website: String,
  openingHours: [String]
});

BusinessSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Business', BusinessSchema);

