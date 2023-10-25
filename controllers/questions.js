const Questions = require("../models/questions");
const Options = require("../models/options");

module.exports.create = async function (req, res) {
  try {
    const question = await Questions.create({ title: req.body.title, description: req.body.description, vote: false });
    return res.status(200).json({
      message: "Question Created",
      data: question,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Question is not created",
      data: err,
    });
  }
};

module.exports.deleteQuestion = async function (req, res) {
  try {
    const deletedQuestion = await Questions.findByIdAndDelete(req.params.id);
    await Options.deleteMany({ question: req.params.id });
    return res.status(200).json({
      message: "Question Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Question could not be deleted",
      data: err,
    });
  }
};

module.exports.addOptions = async function (req, res) {
  try {
    const question = await Questions.findById(req.params.id);

    if (question) {
      const id = question.option.length + 1;
      const optionCreated = await Options.create({
        id: id,
        question: req.params.id,
        text: req.body.text,
        votes: 0,
        link: `http://localhost:8002/postman/options/${id}/add_vote`,
      });

      await Questions.updateOne(
        { _id: req.params.id },
        {
          $push: { option: [optionCreated._id] }
        });

      question.save();

      return res.status(200).json({
        message: "Question And Option Updated",
      });
    } else {
      return res.status(404).json({
        message: "Problem",
        data: "Could not find the question",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error adding option",
      data: err,
    });
  }
};

module.exports.showAllQuestions = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id).populate({
      path: "option",
    });
    console.log('step1');
    if (question) {
      return res.status(200).json({
        message: "Here is the question",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};




