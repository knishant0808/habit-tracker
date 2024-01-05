// Import the express module to create a new router
const express = require('express');
// Create a new router
const router = express.Router();
// Import the passport middleware for authentication
const auth = require('../middleware/passportMiddleware');
// Import the dashboard controller
const dashboardController = require('../controllers/dashboardController');

// Define a route for the dashboard
// The route uses the passport middleware for authentication
// The dashboard controller's renderDashboard function handles requests to this route
router.get('/', auth, dashboardController.renderDashboard);

// Export the router
module.exports = router;