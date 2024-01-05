const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController'); // Adjust the path as necessary
const trackingController  =require('../controllers/trackingController');
const auth = require('../middleware/passportMiddleware'); // Import the authentication middleware

// Route to handle adding a new habit
router.post('/add', auth, habitController.addHabit);
router.post('/delete/:habitId', auth, habitController.deleteHabit);
router.get('/tracking/:habitId', trackingController.renderHabitTracker);
router.post('/update-status', auth, trackingController.updateStatus);

module.exports = router;
