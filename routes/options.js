const express = require("express");
const router = express.Router();
const OptionController = require("../controllers/options");

router.post("/:userId/options/:optionId/add_vote", OptionController.addVote);
router.get("/:id/delete", OptionController.deleteOption);

module.exports = router;

