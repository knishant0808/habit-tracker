const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            return req?.cookies?.token;
        }
    ]),
    secretOrKey: 'secret' // Should be the same as used in jwt.sign()
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.user.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.error(error);
    }
}));

module.exports = passport;
