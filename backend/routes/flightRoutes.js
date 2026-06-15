const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// MongoDB එකෙන් කටුනායක (CMB) හෝ මත්තල (HRI) ඩේටා React එකට දෙන API එක
router.get('/:airportCode', async (req, res) => {
  try {
    const { airportCode } = req.params;
    const flights = await Flight.find({ airportCode: airportCode.toUpperCase() }).sort({ time: 1 });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: "Error fetching flights", error: err.message });
  }
});

module.exports = router;