// Import the mongoose module for MongoDB interactions
const mongoose = require('mongoose');

// Define a new schema for the tracking data
const trackingSchema = new mongoose.Schema({
    // Define a habit field that references the habit being tracked
    habit: {
        type: mongoose.Schema.Types.ObjectId, // The habit field is an ObjectId
        ref: 'habit' // The ObjectId references the 'habit' collection
    },
    // Define a date field for the tracking data
    date: {
        type: Date, // The date field is a date
        default: Date.now // The default value is the current date and time
    },
    // Define a status field for the tracking data
    status: {
        type: String, // The status field is a string
        enum: ['done', 'not done', 'none'], // The status can be 'done', 'not done', or 'none'
        default: 'none' // The default status is 'none'
    }
});

// Export a mongoose model for the tracking data
// The model uses the tracking schema and is associated with the 'tracking' collection
module.exports = mongoose.model('tracking', trackingSchema);