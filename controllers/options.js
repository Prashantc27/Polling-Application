const Questions = require("../models/questions");
const Options = require("../models/options");
const Vote = require('../models/vote');

module.exports.addVote = async function (req, res) {
  try {
    const option = await Options.findById(req.params.optionId);

    if (!option) {
      return res.status(404).json({
        message: "Option not found",
      });
    }

    const currentVote = option.votes + 1;
    console.log(`currentVote ${currentVote} on option ${option.id}`);

    const updatedOption = await Options.updateOne({ _id: req.params.id }, { votes: currentVote });

    if (updatedOption.nModified === 0) {
      return res.status(500).json({
        message: "Error updating option's vote count",
      });
    }

    const userId = req.params.userId;

    const vote = new Vote({
      userId: req.params.userId,
      questionId: option.question,
      selectedOption: req.params.optionId,
    });

    vote.save()
      .then(savedVote => {
        console.log('Vote saved:', savedVote);
        return res.status(200).json({
          message: "Option votes updated",
        });
      })
      .catch(error => {
        return res.status(500).json({
          message: "Error saving vote",
          data: error,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: "Error in finding or updating option",
      data: err,
    });
  }
};


module.exports.deleteOption = async function (req, res) {
  try {
    const option = await Options.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        message: "Option not found",
      });
    }

    const deletedOption = await Options.findByIdAndDelete(req.params.id);

    if (!deletedOption) {
      return res.status(500).json({
        message: "Option cannot be deleted",
      });
    }

    return res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in finding or deleting option",
      data: err,
    });
  }
};







