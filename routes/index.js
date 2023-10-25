const express = require("express");
const router = express.Router();
console.log("router loaded");
const homecontroller = require("../controllers/home");

router.get("/", homecontroller.front);
router.get('/signup', (req, res) => {
    return res.render("signup");
});
router.get('/login', (req, res) => {
    return res.render('login');
});
router.use("/questions", require("./questions"));
router.use("/options", require("./options"));
module.exports = router;

