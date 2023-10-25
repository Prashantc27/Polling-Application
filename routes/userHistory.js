const express = require('express');
const router = express.Router();
const userHistoryController = require('../controllers/userHistory');
const Options = require('../models/options');
const Question = require('../models/questions');
const Vote = require('../models/vote');

router.get('/history', async (req, res) => {

    try {
        const userId = req.user;
        const votingHistory = await userHistoryController.getUserVotingHistory(userId);

        if (!votingHistory) {
            return res.status(404).send('User not found');
        }

        const voteOptionIds = votingHistory.votes.map(vote => vote.selectedOption);
        const optionDetails = await Options.find({ _id: { $in: voteOptionIds } });

        const voteQuestionIds = votingHistory.votes.map(vote => vote.questionId);
        const questionDetails = await Question.find({ _id: { $in: voteQuestionIds } });

        votingHistory.options = optionDetails;
        votingHistory.questions = questionDetails;
        res.render('voting-history', { votingHistory });
    } catch (error) {
        return res.status(500).send('Error retrieving voting history');
    }
});


module.exports = router;