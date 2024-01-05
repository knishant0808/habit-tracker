// Import the passport module for authentication
const passport = require('passport');
// Import the Strategy and ExtractJwt objects from the passport-jwt module
const { Strategy, ExtractJwt } = require('passport-jwt');
// Import the User model
const User = require('../models/user');

// Define the options for the JWT strategy
const opts = {
    // Define how the JWT should be extracted from the request
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            // Try to extract the JWT from the cookies
            return req?.cookies?.token;
        }
    ]),
    // Define the secret key for the JWT
    secretOrKey: 'secret' // Should be the same as used in jwt.sign()
};

// Use the JWT strategy for passport
passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        // Try to find the user by their ID
        const user = await User.findById(jwt_payload.user.id);
        // If the user is found, return the user
        if (user) {
            return done(null, user);
        }
        // If the user is not found, return false
        return done(null, false);
    } catch (error) {
        // Log any errors that occur
        console.error(error);
    }
}));

// Export the configured passport
module.exports = passport;