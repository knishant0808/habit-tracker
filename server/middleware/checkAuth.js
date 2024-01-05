// Import the jsonwebtoken module
const jwt = require('jsonwebtoken');

// Define a middleware function to check for authentication
const checkAuth = (req, res, next) => {
    // Try to get the token from the cookies
    const token = req.cookies['token']; // Assuming the token is stored in a cookie named 'token'

    // If there is no token, proceed without authentication
    if (!token) {
        return next(); // No token, proceed without authentication
    }

    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
        // If there is an error (the token is invalid), proceed without authentication
        if (err) {
            return next(); // Invalid token, proceed without authentication
        }

        // If the token is valid, add the decoded token to the request
        req.user = decoded; // Token is valid, add decoded token to request
        // Proceed to the next middleware function or route handler
        next();
    });
};

// Export the checkAuth middleware function
module.exports = checkAuth;