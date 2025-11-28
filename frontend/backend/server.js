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

// Schema for storing image data
const imageSchema = new mongoose.Schema({
  logoUrl: String,
  beach: String,
  forest: String,
  river: String
}, { collection: 'siteSettings' });

const SiteSettings = mongoose.model('SiteSettings', imageSchema);

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});