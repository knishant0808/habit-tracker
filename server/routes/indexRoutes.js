const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth'); // Import the new middleware

const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const habitRoutes = require('./habitRoutes');

// Route for the homepage
router.get('/', checkAuth, (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.render('homepage');
    }
});

// Further routes
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/habit', habitRoutes);

module.exports = router;
