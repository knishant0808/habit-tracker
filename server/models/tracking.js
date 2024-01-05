const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit'
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['done', 'not done', 'none'],
        default: 'none'
    }
});

module.exports = mongoose.model('tracking', trackingSchema);
