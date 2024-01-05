// Import the express module to create a new router
const express = require('express');
// Create a new router
const router = express.Router();
// Import the checkAuth middleware
const checkAuth = require('../middleware/checkAuth');

// Import the user, dashboard, and habit routes
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const habitRoutes = require('./habitRoutes');

// Define a route for the homepage
// The route uses the checkAuth middleware
// If the user is authenticated, they are redirected to the dashboard
// If the user is not authenticated, the homepage is rendered
router.get('/', checkAuth, (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.render('homepage');
    }
});

// Define routes for users, the dashboard, and habits
// These routes are prefixed with '/user', '/dashboard', and '/habit' respectively
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/habit', habitRoutes);

// Export the router
module.exports = router;