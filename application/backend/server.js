const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { float } = require('webidl-conversions');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

// Schema for storing image data
const imageSchema = new mongoose.Schema({
  logoUrl: String,
  beach: String,
  forest: String,
  river: String
}, { collection: 'siteSettings' });

// Schema for storing image data
const destinationsSchema = new mongoose.Schema({
  picture: String,
  name: String,
  description: String,
  rating: Number,
  category: String
}, { collection: 'destinatons' });


const SiteSettings = mongoose.model('SiteSettings', imageSchema);
const destinationsModel = mongoose.model('destinationsModel', destinationsSchema);


// ============= Homepage ==============

// GET all site settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE site settings
app.post('/api/settings', async (req, res) => {
  try {
    const { logoUrl, beach, forest, river } = req.body;
    await SiteSettings.findOneAndUpdate(
      {}, 
      { logoUrl, beach, forest, river }, 
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ============= Destinations ==============


// GET all destinations
// GET destinations with optional category filter
app.get('/api/destinations', async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};

    const destinations = await destinationsModel.find(filter);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST a new destination
app.post('/api/destinations', async (req, res) => {
  try {
    const { picture, name, description, rating, category } = req.body;

    const newDestination = new destinationsModel({
      picture,
      name,
      description,
      rating,
      category
    });

    await newDestination.save();

    res.status(201).json({
      message: 'Destination created successfully',
      destination: newDestination
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE all destinations
app.delete('/api/destinations', async (req, res) => {
  try {
    await destinationsModel.deleteMany({});
    res.json({ message: "All destinations deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});