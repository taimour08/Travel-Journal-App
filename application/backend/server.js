const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// --------------------------
// MongoDB Connection
// --------------------------
mongoose.connect('mongodb://localhost:27017/admin')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));


// --------------------------
// SCHEMAS & MODELS
// --------------------------

// Site settings schema
const imageSchema = new mongoose.Schema({
  logoUrl: String,
  beach: String,
  forest: String,
  river: String
}, { collection: 'siteSettings' });

const SiteSettings = mongoose.model('SiteSettings', imageSchema);


// Destinations schema
const destinationsSchema = new mongoose.Schema({
  picture: String,
  name: String,
  description: String,
  rating: Number,
  category: String
}, { collection: 'destinations' });

const destinationsModel = mongoose.model('destinationsModel', destinationsSchema);


// Journals schema
const journalsSchema = new mongoose.Schema({
  name: String,
  note: String,
  rating: Number,
  date: String
}, { collection: 'journals' });

const journalsModel = mongoose.model('journalsModel', journalsSchema);


// --------------------------
// ROUTES
// --------------------------

//
// ======== HOMEPAGE SETTINGS ========
//

// GET site settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST/UPDATE settings
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



//
// ======== DESTINATIONS ========
//

// GET destinations (with optional ?category=)
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

// DELETE ALL destinations
app.delete('/api/destinations', async (req, res) => {
  try {
    await destinationsModel.deleteMany({});
    res.json({ message: "All destinations deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//
// ======== JOURNALS ========
//

// GET all journals (optional filter by name or date)
app.get('/api/journals', async (req, res) => {
  try {
    const { name, date } = req.query;
    const filter = {};
    if (name) filter.name = name;
    if (date) filter.date = date; // assuming date is sent as string

    const journals = await journalsModel.find(filter);
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new journal
app.post('/api/journals', async (req, res) => {
  try {
    const { name, note, rating, date } = req.body;

    const newJournal = new journalsModel({
      name,
      note,
      rating,
      date
    });

    await newJournal.save();
    res.status(201).json({
      message: 'Journal created successfully',
      journal: newJournal
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a single journal by ID
app.delete('/api/journals/:id', async (req, res) => {
  try {
    const deletedJournal = await journalsModel.findByIdAndDelete(req.params.id);

    if (!deletedJournal) return res.status(404).json({ error: "Journal not found" });

    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ALL journals
app.delete('/api/journals', async (req, res) => {
  try {
    await journalsModel.deleteMany({});
    res.json({ message: "All journals deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// --------------------------
// START SERVER
// --------------------------
app.listen(PORT, () => {
  if (require.main === module) {
  app.listen(3000, () => console.log("Server running"));
}

});



module.exports = app;
