const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
        required: true,
    },
    selectedOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options',
        required: true,
    },
    voteTimestamp: {
        type: Date,
        default: Date.now,
    },
});

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

module.exports = UserHistory;
