const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const dealController = require('../controllers/dealController'); // Import the deal controller

// Create a deal
router.post('/', [
  auth,
  [
    check('referenceNumber', 'Reference number is required').not().isEmpty(),
    check('dealName', 'Deal name is required').not().isEmpty(),
    check('reservationsLeft', 'Reservations left is required').isNumeric(),
    check('roomType', 'Room type is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
  ]
], dealController.createDeal); // Use controller function

// Get all deals
router.get('/', auth, dealController.getDeals); // Use controller function

// Update a deal
router.put('/:id', auth, dealController.updateDeal); // Use controller function

// Delete a deal
router.delete('/:id', auth, dealController.deleteDeal); // Use controller function

module.exports = router;