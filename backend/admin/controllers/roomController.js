const { validationResult } = require('express-validator');
const Room = require('../models/Room');

// @desc    Get all rooms
// @access  Public
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ roomNumber: 1 });
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get room by ID
// @access  Public
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.json(room);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a room
// @access  Private (Admin only)
exports.createRoom = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newRoom = new Room(req.body);
        const room = await newRoom.save();
        res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a room
// @access  Private (Admin only)
exports.updateRoom = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.json(room);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a room
// @access  Private (Admin only)
exports.deleteRoom = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.json({ msg: 'Room removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Room not found' });
        }
        res.status(500).send('Server Error');
    }
}; 