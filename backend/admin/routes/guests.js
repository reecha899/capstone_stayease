const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const guestController = require('../controllers/guestController');

// @route   GET /api/guests
// @desc    Get all guests
// @access  Private
router.get('/', auth, guestController.getAllGuests);

// @route   GET /api/guests/:id
// @desc    Get guest by ID
// @access  Private
router.get('/:id', auth, guestController.getGuestById);

// @route   POST /api/guests
// @desc    Create a guest
// @access  Private
router.post('/', auth, guestController.createGuest);

// @route   PUT /api/guests/:id
// @desc    Update a guest
// @access  Private
router.put('/:id', auth, guestController.updateGuest);

// @route   DELETE /api/guests/:id
// @desc    Delete a guest
// @access  Private
router.delete('/:id', auth, guestController.deleteGuest);

module.exports = router; 