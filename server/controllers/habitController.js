const Habit = require('../models/habit'); // Import the Habit model

const addHabit = async (req, res) => {
    try {
        const { habitName } = req.body;
        const newHabit = new Habit({
            user: req.user.id, // Assuming req.user is set by your authentication middleware
            name: req.body.habitName
        });

        await newHabit.save();
        res.redirect('/dashboard'); // Redirect to the dashboard after adding
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addHabit
    // ... other controller methods ...
};
