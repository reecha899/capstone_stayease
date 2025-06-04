const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// @route   GET api/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/', auth, userController.getAllUsers);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private (Admin only)
router.get('/:id', auth, userController.getUserById);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private (Admin only)
router.put('/:id', [
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('role', 'Role is required').isIn(['admin', 'staff', 'user'])
    ]
], userController.updateUser);

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete('/:id', auth, userController.deleteUser);

module.exports = router; 