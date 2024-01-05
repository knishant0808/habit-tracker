const moment = require('moment'); // Moment.js for date manipulation
const Tracking = require('../models/tracking'); // Adjust the path as necessary
const Habit = require('../models/habit'); // Adjust the path as necessary

const renderHabitTracker = async (req, res) => {
    try {
        const habitId = req.params.habitId;
        
        // Fetch the habit details, including the name
        const habit = await Habit.findById(habitId);
        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        const trackingData = await Tracking.find({
            habit: habitId,
            date: { 
                $gte: moment().subtract(6, 'days').startOf('day').toDate(),
                $lte: moment().endOf('day').toDate()
            }
        }).sort({ date: 1 }); // Sort by date in ascending order to simplify the logic

        // Create a map of existing tracking data
        const trackingMap = {};
        trackingData.forEach(track => {
            const trackDate = moment(track.date).format('YYYY-MM-DD');
            trackingMap[trackDate] = track.status;
        });

        // Ensure tracking data for each of the last 7 days
        const finalTrackingData = [];
        for (let i = 6; i >= 0; i--) {
            const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
            finalTrackingData.push({
                date: moment().subtract(i, 'days').toDate(),
                status: trackingMap[date] || 'none'
            });
        }

        // Render the template with the habit name and tracking data
        res.render('habitTracker', {
            habit: habit,
            habitName: habit.name,
            trackingData: finalTrackingData,
            moment: moment
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tracking data');
    }
};

const updateStatus = async (req, res) => {
    try {
        const { habitId, date, status } = req.body;
        const formattedDate = moment(date).startOf('day');

        // Check if tracking already exists for the given date
        let tracking = await Tracking.findOne({
            habit: habitId,
            date: {
                $gte: formattedDate.toDate(),
                $lt: moment(formattedDate).add(1, 'days').toDate()
            }
        });

        if (tracking) {
            // Update existing tracking
            tracking.status = status;
        } else {
            // Or create a new tracking entry
            tracking = new Tracking({
                habit: habitId,
                date: formattedDate.toDate(),
                status: status
            });
        }

        await tracking.save();
        res.redirect('/habit/tracking/' + habitId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating status');
    }
};

module.exports = {
    renderHabitTracker,
    updateStatus
};
