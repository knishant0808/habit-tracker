// Import the Habit model
const Habit = require('../models/habit');
// Import the tracking model    
const Tracking = require('../models/tracking');

// Define an asynchronous function to add a habit
const addHabit = async (req, res) => {
    try {
        // Extract the habit name from the request body
        const { habitName } = req.body;
        // Create a new habit instance
        const newHabit = new Habit({
            // Set the user ID to the ID of the currently authenticated user
            user: req.user.id,
            // Set the habit name
            name: habitName
        });

        // Save the new habit to the database
        await newHabit.save();
        // Redirect the user to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        // Log any errors that occur
        console.error(error);
        // Send a 500 status code and an error message
        res.status(500).send('Server Error');
    }
};

// Define an asynchronous function to delete a habit and its associated tracking data
const deleteHabit = async (req, res) => {
    try {
        // Extract the habit ID from the request parameters
        const habitId = req.params.habitId;
        // First, delete all tracking data associated with this habit
        await Tracking.deleteMany({ habit: habitId });
        // Then, delete the habit itself
        await Habit.findByIdAndDelete(habitId);
        // Redirect the user to the dashboard after deletion
        res.redirect('/dashboard');
    } catch (error) {
        // Log any errors that occur
        console.error(error);
        // Send a 500 status code and an error message
        res.status(500).send('Server Error');
    }
};

// Export the addHabit and deleteHabit functions
module.exports = {
    addHabit,
    deleteHabit
};