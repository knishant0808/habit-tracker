const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies['token']; // Assuming the token is stored in a cookie named 'token'

    if (!token) {
        return next(); // No token, proceed without authentication
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return next(); // Invalid token, proceed without authentication
        }

        req.user = decoded; // Token is valid, add decoded token to request
        next();
    });
};

module.exports = checkAuth;
