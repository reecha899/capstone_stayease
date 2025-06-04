const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['single', 'double', 'triple', 'vip', 'suite', 'deluxe']
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Reserved', 'Waitlist'],
        default: 'Available',
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    },
    floor: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema); 