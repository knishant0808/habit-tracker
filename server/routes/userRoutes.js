
// Import the express module to create a new router
const express = require('express');
// Create a new router
const router = express.Router();
// Import the user controller
const userController = require('../controllers/userController');
// Import the authentication middleware
const auth = require('../middleware/passportMiddleware');

// Define a route for the user dashboard
// The route uses the authentication middleware
// If the user is authenticated, a message is sent
router.get('/dashboard', auth, (req, res) => {
    res.send('Dashboard - User authenticated');
});

// Define a route for the user registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// Define a route for the user login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Define a route for the user logout
// The route clears the 'token' cookie and redirects the user to the homepage
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Define a route for user registration
// The userController's registerUser function handles requests to this route
router.post('/register', userController.registerUser);

// Define a route for user login
// The userController's loginUser function handles requests to this route
router.post('/login', userController.loginUser);

// Export the router
module.exports = router;