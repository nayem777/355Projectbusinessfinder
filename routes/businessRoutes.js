const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const { Client } = require('@googlemaps/google-maps-services-js');

const googleMapsClient = new Client({});

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific business
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new business
router.post('/', async (req, res) => {
  const business = new Business(req.body);
  try {
    const newBusiness = await business.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a business
router.patch('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a business
router.delete('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json({ message: 'Business deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search businesses by location and category
router.get('/search', async (req, res) => {
  const { lat, lng, category, radius } = req.query;
  try {
    const businesses = await Business.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) || 5000
        }
      },
      category: category ? { $regex: category, $options: 'i' } : { $exists: true }
    });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

