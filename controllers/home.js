const Questions = require("../models/questions");
const Options = require("../models/options");

module.exports.front = async function (req, res) {
  try {
    let question = await Questions.find({}).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).render("home", {
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};

