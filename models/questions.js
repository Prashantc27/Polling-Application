const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    option: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Options",
      },
    ],
    vote: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Questions = mongoose.model("Questions", questionSchema);
module.exports = Questions;

