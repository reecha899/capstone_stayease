const Rate = require('../models/Rate');

// Create a new rate
exports.createRate = async (req, res) => {
  try {
    const rate = new Rate(req.body);
    await rate.save();
    res.status(201).json(rate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all rates
exports.getRates = async (req, res) => {
  try {
    const rates = await Rate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a rate
exports.updateRate = async (req, res) => {
  try {
    const rate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rate) {
      return res.status(404).json({ message: 'Rate not found' });
    }
    res.json(rate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a rate
exports.deleteRate = async (req, res) => {
  try {
    await Rate.findByIdAndRemove(req.params.id);
    res.json({ message: 'Rate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 