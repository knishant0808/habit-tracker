const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Import user routes
const dashboardRoutes = require('./dashboardRoutes');
const habitRoutes = require('./habitRoutes');

// Route for the homepage
router.get('/', (req, res) => {
    res.render('homepage');
});

// Use userRoutes for '/user' path
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/habit', habitRoutes);

module.exports = router;
