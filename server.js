const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const businessRoutes = require('./routes/businessRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

app.use('/api/businesses', businessRoutes);
app.use('/api/itineraries', itineraryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

