const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middleware/auth');

// Route for the user registration page
router.get('/dashboard', auth, (req, res) => {
    res.send('Dashboard - User authenticated');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Route for handling user registration
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Add other user-related routes as needed

module.exports = router;