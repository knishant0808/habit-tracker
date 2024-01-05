// Import the Habit model
const Habit = require('../models/habit'); // Make sure the path is correct

// Define an asynchronous function to render the dashboard
const renderDashboard = async (req, res) => {
    try {
        // Try to find all habits associated with the current user
        const habits = await Habit.find({ user: req.user.id });
        // Render the dashboard view and pass the habits to it
        res.render('dashboard', { habits });
    } catch (error) {
        // Log any errors that occur
        console.error(error);
        // Send a 500 status code and an error message
        res.status(500).send('Error fetching habits');
    }
};

// Export the renderDashboard function
module.exports = {
    renderDashboard
};