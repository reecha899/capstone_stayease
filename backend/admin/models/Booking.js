const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
        default: 'pending'
    },
    guests: {
        adults: {
            type: Number,
            required: true,
            default: 1
        },
        children: {
            type: Number,
            default: 0
        }
    },
    specialRequests: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    registrationNumber: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0
    }
});

// Add index for efficient querying
bookingSchema.index({ checkIn: 1, checkOut: 1, room: 1 });

module.exports = mongoose.model('Booking', bookingSchema); 