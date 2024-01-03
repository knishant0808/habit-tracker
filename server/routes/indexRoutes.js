const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Import user routes

// Route for the homepage
router.get('/', (req, res) => {
    res.render('homepage');
});

// Use userRoutes for '/user' path
router.use('/user', userRoutes);

module.exports = router;
