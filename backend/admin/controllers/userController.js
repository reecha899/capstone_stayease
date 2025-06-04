const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc    Get all users
// @access  Private (Admin only)
exports.getAllUsers = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user by ID
// @access  Private (Admin only)
exports.getUserById = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update user
// @access  Private (Admin only)
exports.updateUser = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, role, phone } = req.body;

        // Build user object
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (role) userFields.role = role;
        if (phone) userFields.phone = phone;

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete user
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
}; 