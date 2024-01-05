const express = require('express');
const router = express.Router();
const auth = require('../middleware/passportMiddleware');
const dashboardController = require('../controllers/dashboardController');

// Dashboard route
router.get('/', auth, dashboardController.renderDashboard);

module.exports = router;
