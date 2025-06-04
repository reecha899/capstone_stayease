const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const rateController = require('../controllers/rateController');

// Create a rate
router.post('/', [
  auth,
  [
    check('roomType', 'Room type is required').not().isEmpty(),
    check('deal', 'Deal is required').not().isEmpty(),
    check('cancellationPolicy', 'Cancellation policy is required').not().isEmpty(),
    check('dealPrice', 'Deal price is required').isNumeric(),
    check('rate', 'Rate is required').isNumeric(),
    check('availability', 'Availability is required').not().isEmpty()
  ]
], rateController.createRate);

// Get all rates
router.get('/', auth, rateController.getRates);

// Update a rate
router.put('/:id', auth, rateController.updateRate);

// Delete a rate
router.delete('/:id', auth, rateController.deleteRate);

module.exports = router;