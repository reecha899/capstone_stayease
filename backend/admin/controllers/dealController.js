const Deal = require('../models/Deal');

// Create a new deal
exports.createDeal = async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all deals
exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a deal
exports.updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(deal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    await Deal.findByIdAndRemove(req.params.id);
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 