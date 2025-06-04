const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Private (Admin/Staff)
router.get('/', auth, bookingController.getAllBookings);

// @route   GET api/bookings/user
// @desc    Get user's bookings
// @access  Private
router.get('/user', auth, bookingController.getUserBookings);

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', [
    auth,
    [
        check('room', 'Room is required').not().isEmpty(),
        check('checkIn', 'Check-in date is required').not().isEmpty(),
        check('checkOut', 'Check-out date is required').not().isEmpty(),
        check('guests.adults', 'Number of adults is required').isNumeric()
    ]
], bookingController.createBooking);

// @route   PUT api/bookings/:id
// @desc    Update booking status
// @access  Private (Admin/Staff)
router.put('/:id', auth, bookingController.updateBooking);

// @route   DELETE api/bookings/:id
// @desc    Delete a booking
// @access  Private (Admin/Staff)
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router; 