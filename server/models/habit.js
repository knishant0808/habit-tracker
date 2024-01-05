// Import the mongoose module for MongoDB interactions
const mongoose = require('mongoose');

// Define a new schema for the habit data
const habitSchema = new mongoose.Schema({
    // Define a user field that references the user who owns this habit
    user: {
        type: mongoose.Schema.Types.ObjectId, // The user field is an ObjectId
        ref: 'user' // The ObjectId references the 'user' collection
    },
    // Define a name field for the habit
    name: {
        type: String, // The name field is a string
        required: true // The name field is required
    }
});

// Export a mongoose model for the habit data
// The model uses the habit schema and is associated with the 'habit' collection
module.exports = mongoose.model('habit', habitSchema);