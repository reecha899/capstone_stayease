const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// GET /api/dashboard/overview
router.get('/overview', auth, dashboardController.getOverview);

// GET /api/dashboard/rooms-summary
router.get('/rooms-summary', auth, dashboardController.getRoomSummary);

module.exports = router; 