// Import the mongoose module
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database
        await mongoose.connect('mongodb+srv://knishant0808:knightn0808K@cluster0.qm9vw62.mongodb.net/', {
            useNewUrlParser: true, // Use the new URL string parser
            useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
        });
        // Log a success message if the connection is established
        console.log('MongoDB Connected');
    } catch (err) {
        // Log the error message if the connection fails
        console.error(err.message);
        // Exit the process with a failure status
        process.exit(1);
    }
};

// Export the connectDB function
module.exports = connectDB;