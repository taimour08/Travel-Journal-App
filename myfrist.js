const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB - FIXED YOUR CONNECTION URL
mongoose.connect('mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB localhost:27017/admin'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Gamer Schema
const gamerSchema = new mongoose.Schema({
  name: String,
  level: Number,
  game: String,
  score: Number
}, { collection: 'Gamers' }); // Explicitly use 'Gamers' collection

// Create Gamer Model
const Gamer = mongoose.model('Gamer', gamerSchema);

// 📍 GET ALL GAMERS
app.get('/api/gamers', async (req, res) => {
  try {
    const gamers = await Gamer.find();
    res.json({
      success: true,
      count: gamers.length,
      data: gamers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 📍 GET GAMER BY ID
app.get('/api/gamers/:id', async (req, res) => {
  try {
    const gamer = await Gamer.findById(req.params.id);
    if (!gamer) {
      return res.status(404).json({ success: false, error: 'Gamer not found' });
    }
    res.json({ success: true, data: gamer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ➕ CREATE NEW GAMER
app.post('/api/gamers', async (req, res) => {
  try {
    const newGamer = new Gamer(req.body);
    const savedGamer = await newGamer.save();
    res.status(201).json({
      success: true,
      message: 'Gamer created successfully',
      data: savedGamer
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 🗑️ DELETE GAMER
app.delete('/api/gamers/:id', async (req, res) => {
  try {
    const deletedGamer = await Gamer.findByIdAndDelete(req.params.id);
    if (!deletedGamer) {
      return res.status(404).json({ success: false, error: 'Gamer not found' });
    }
    res.json({ success: true, message: 'Gamer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});