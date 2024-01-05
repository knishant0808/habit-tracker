const moment = require('moment'); // Importing moment for date manipulation
const Tracking = require('../models/tracking'); // Import Tracking model
const Habit = require('../models/habit'); // Import Habit model

// Controller function to render the habit tracking page
const renderHabitTracker = async (req, res) => {
    try {
        const habitId = req.params.habitId; // Extracting habit ID from the request parameters
        
        // Fetching the habit details using the habit ID
        const habit = await Habit.findById(habitId);
        if (!habit) {
            // If the habit is not found, send a 404 response
            return res.status(404).send('Habit not found');
        }

        // Query for tracking data within the last 7 days
        const trackingData = await Tracking.find({
            habit: habitId,
            date: { 
                $gte: moment().subtract(6, 'days').startOf('day').toDate(),
                $lte: moment().endOf('day').toDate()
            }
        }).sort({ date: 1 }); // Sorting by date in ascending order

        // Mapping existing tracking data for easy lookup
        const trackingMap = {};
        trackingData.forEach(track => {
            const trackDate = moment(track.date).format('YYYY-MM-DD');
            trackingMap[trackDate] = track.status;
        });

        // Preparing tracking data for each of the last 7 days
        const finalTrackingData = [];
        for (let i = 6; i >= 0; i--) {
            const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
            finalTrackingData.push({
                date: moment().subtract(i, 'days').toDate(),
                status: trackingMap[date] || 'none' // Default to 'none' if no data
            });
        }

        // Rendering the habit tracker page with necessary data
        res.render('habitTracker', {
            habit: habit,
            habitName: habit.name,
            trackingData: finalTrackingData,
            moment: moment
        });
    } catch (error) {
        // Log and send an error response in case of any issues
        console.error(error);
        res.status(500).send('Error fetching tracking data');
    }
};

// Controller function to update the status of a habit
const updateStatus = async (req, res) => {
    try {
        const { habitId, date, status } = req.body; // Extract data from the request body
        const formattedDate = moment(date).startOf('day'); // Format the date to start of the day

        // Check for existing tracking data on the given date
        let tracking = await Tracking.findOne({
            habit: habitId,
            date: {
                $gte: formattedDate.toDate(),
                $lt: moment(formattedDate).add(1, 'days').toDate()
            }
        });

        if (tracking) {
            // Update the status if tracking data exists
            tracking.status = status;
        } else {
            // Create new tracking data if it does not exist
            tracking = new Tracking({
                habit: habitId,
                date: formattedDate.toDate(),
                status: status
            });
        }

        // Save the tracking data and redirect to the tracking page
        await tracking.save();
        res.redirect('/habit/tracking/' + habitId);
    } catch (error) {
        // Log and send an error response in case of any issues
        console.error(error);
        res.status(500).send('Error updating status');
    }
};

// Exporting the controller functions
module.exports = {
    renderHabitTracker,
    updateStatus
};
