const User = require('../models/user');
const Question = require('../models/questions');
const Vote = require('../models/vote');
const Options = require('../models/options');



async function getUserVotingHistory(userId) {
    try {

        const user = await User.findById(userId);
        if (!user) {
            return null;
        }
        const votes = await Vote.find({ userId: userId });
        const questionIds = votes.map(vote => vote.questionId);
        const questions = await Question.find({ _id: { $in: questionIds } });

        return {
            user: user,
            votes: votes,
            questions: questions,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserVotingHistory,
};
