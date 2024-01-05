// Import the mongoose module for MongoDB interactions
const mongoose = require('mongoose');

// Define a new schema for the user data
const UserSchema = new mongoose.Schema({
    // Define a name field for the user
    name: {
        type: String, // The name field is a string
        required: true // The name field is required
    },
    // Define an email field for the user
    email: {
        type: String, // The email field is a string
        required: true, // The email field is required
        unique: true // The email field must be unique
    },
    // Define a password field for the user
    password: {
        type: String, // The password field is a string
        required: true // The password field is required
    }
    // You can add more fields as needed
});

// Export a mongoose model for the user data
// The model uses the UserSchema and is associated with the 'User' collection
module.exports = mongoose.model('User', UserSchema);