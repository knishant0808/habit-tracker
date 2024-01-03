const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies['token']; 
    if (!token) {
        return res.redirect('/login');
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            // Token is not valid
            return res.redirect('/login');
        }
        // Token is valid
        req.user = decoded; // You can attach the decoded token to the request, if needed
        next();
    });
};

// Dashboard route
router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard'); // Assuming you have a dashboard.ejs in your views
});

module.exports = router;
