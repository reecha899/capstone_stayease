const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  deal: { type: String, required: true },
  cancellationPolicy: { type: String, required: true },
  dealPrice: { type: Number, required: true },
  rate: { type: Number, required: true },
  availability: { type: String, required: true } // e.g. "5 rooms", "Full"
});

module.exports = mongoose.model('Rate', rateSchema);