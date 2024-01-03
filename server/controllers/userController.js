const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        // Create a new user
        user = new User({
            name,
            email,
            password
        });
        // Encrypt the password
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);
        await user.save();
        // Redirect or handle as needed
        res.redirect('/user/login');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists with the given email and password
        let user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).send('Invalid Credentials');
        }

        // User found, handle login success by creating a JWT
        const payload = {
            user: {
                id: user.id // Use a unique property of the user
            }
        };
        jwt.sign(
            payload,
            'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly : true });
                res.redirect('/dashboard');
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser
};
