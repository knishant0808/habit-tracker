// Import the express module to create a new router
const express = require('express');
// Create a new router
const router = express.Router();
// Import the habit controller
const habitController = require('../controllers/habitController'); // Adjust the path as necessary
// Import the tracking controller
const trackingController  =require('../controllers/trackingController');
// Import the authentication middleware
const auth = require('../middleware/passportMiddleware');

// Define a route to handle adding a new habit
// The route uses the authentication middleware
// The habit controller's addHabit function handles requests to this route
router.post('/add', auth, habitController.addHabit);

// Define a route to handle deleting a habit
// The route uses the authentication middleware
// The habit controller's deleteHabit function handles requests to this route
router.post('/delete/:habitId', auth, habitController.deleteHabit);

// Define a route to render the habit tracker
// The tracking controller's renderHabitTracker function handles requests to this route
router.get('/tracking/:habitId', trackingController.renderHabitTracker);

// Define a route to update the status of a habit
// The route uses the authentication middleware
// The tracking controller's updateStatus function handles requests to this route
router.post('/update-status', auth, trackingController.updateStatus);

// Export the router
module.exports = router;