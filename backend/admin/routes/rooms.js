const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const roomController = require('../controllers/roomController');

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
router.get('/', roomController.getAllRooms);

// @route   GET api/rooms/:id
// @desc    Get room by ID
// @access  Public
router.get('/:id', roomController.getRoomById);

// @route   POST api/rooms
// @desc    Create a room
// @access  Private (Admin only)
router.post('/', [
    auth,
    [
        check('roomNumber', 'Room number is required').not().isEmpty(),
        check('type', 'Room type is required').not().isEmpty(),
        check('price', 'Price is required').isNumeric(),
        check('capacity', 'Capacity is required').isNumeric()
    ]
], roomController.createRoom);

// @route   PUT api/rooms/:id
// @desc    Update a room
// @access  Private (Admin only)
router.put('/:id', auth, roomController.updateRoom);

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private (Admin only)
router.delete('/:id', auth, roomController.deleteRoom);

module.exports = router; 