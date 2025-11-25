const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

// Gamer Schema
const gamerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  game: String
}, { collection: 'Gamers' }); // Connect to the Collection called Gamers in MongoDB


// The model is stored in this variable
const Gamer = mongoose.model('Gamer', gamerSchema);

// GET all gamers when Localhost:3000/Api/Gamers
app.get('/api/gamers', async (req, res) => {
  try {
    const gamers = await Gamer.find();
    res.json(gamers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new gamer
app.post('/api/gamers', async (req, res) => {
  try {
    const newGamer = new Gamer(req.body);
    const savedGamer = await newGamer.save();
    res.json(savedGamer);
    console.log(`All Done`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});