const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController'); // Adjust the path as necessary
const auth = require('../middleware/passportMiddleware'); // Import the authentication middleware

// Route to handle adding a new habit
router.post('/add', auth, habitController.addHabit);

module.exports = router;
