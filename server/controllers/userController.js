const User = require('../models/user'); // Importing the User model
const jwt = require('jsonwebtoken'); // Importing JSON Web Token for user authentication
// const bcrypt = require('bcryptjs'); // Import bcryptjs for password encryption (commented out as it's not currently used)

// Function to handle user registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Extracting user details from request body
    try {
        // Check if a user already exists with the given email
        let user = await User.findOne({ email });
        if (user) {
            // If user exists, return a 400 error
            return res.status(400).send('User already exists');
        }

        // Creating a new user instance
        user = new User({
            name,
            email,
            password
        });

        // Password encryption (commented out as it's currently not in use)
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);

        // Save the new user to the database
        await user.save();

        // Redirect user to login page or handle as needed
        res.redirect('/user/login');
    } catch (err) {
        // Log any server errors and return a 500 error response
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Function to handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Extracting login credentials from request body
    try {
        // Check if user exists with the given email and password
        let user = await User.findOne({ email, password });
        if (!user) {
            // If user does not exist, return a 400 error for invalid credentials
            return res.status(400).send('Invalid Credentials');
        }

        // If user is found, create a JWT for user authentication
        const payload = {
            user: {
                id: user.id // Using user's unique ID as part of the JWT payload
            }
        };
        jwt.sign(
            payload,
            'secret', // Secret key for JWT (should ideally be an environment variable)
            { expiresIn: '1h' }, // Token expiry set to 1 hour
            (err, token) => {
                if (err) throw err;
                // Set the JWT as an HTTP-only cookie and redirect to dashboard
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/dashboard');
            }
        );
    } catch (err) {
        // Log any server errors and return a 500 error response
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser
};
