// Import the passport module for authentication
const passport = require('passport');

// Export the passport middleware configured to use the 'jwt' strategy
// The 'session' option is set to false because JWTs are stateless
module.exports = passport.authenticate('jwt', { session: false });