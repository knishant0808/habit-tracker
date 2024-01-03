const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret' // Replace with your secret key
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.error(error);
    }
}));

module.exports = passport;
