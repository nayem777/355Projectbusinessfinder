const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const { Worker } = require('worker_threads');

// Get all itineraries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.params.userId }).populate('locations.business');
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific itinerary
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('locations.business');
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new itinerary
router.post('/', async (req, res) => {
  const itinerary = new Itinerary(req.body);
  try {
    const newItinerary = await itinerary.save();
    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an itinerary
router.patch('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an itinerary
router.delete('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optimize route for an itinerary
router.post('/:id/optimize', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('locations.business');
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });

    // Simulate multi-threaded route optimization using Worker Threads
    const worker = new Worker('./workers/routeOptimizer.js', {
      workerData: {
        locations: itinerary.locations.map(loc => ({
          id: loc.business._id,
          lat: loc.business.location.coordinates[1],
          lng: loc.business.location.coordinates[0]
        }))
      }
    });

    worker.on('message', async (optimizedRoute) => {
      itinerary.optimizedRoute = optimizedRoute.map(loc => loc.id);
      await itinerary.save();
      res.json(itinerary);
    });

    worker.on('error', (err) => {
      res.status(500).json({ message: 'Route optimization failed', error: err.message });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

