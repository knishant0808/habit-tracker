const Habit = require('../models/habit'); // Make sure the path is correct

const renderDashboard = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.render('dashboard', { habits });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching habits');
    }
};

module.exports = {
    renderDashboard
};
