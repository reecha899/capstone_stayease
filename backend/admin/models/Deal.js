const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  dealName: { type: String, required: true },
  tags: { type: [String] },
  price: { type: Number },
  roomFacility: { type: String },
  reservationsLeft: { type: Number, required: true },
  endDate: { type: Date },
  roomType: { type: String, required: true }, // e.g. "VIP", "Single, Double"
  discount: { type: Number },
  startDate: { type: Date },
  status: { type: String, enum: ['Ongoing', 'Full', 'Inactive', 'New'], default: 'Ongoing' }
});

module.exports = mongoose.model('Deal', dealSchema);