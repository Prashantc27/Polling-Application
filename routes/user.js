const express = require('express');
const { handleUserSignup, handleUserLogin, handleUserLogout } = require('../controllers/user');
const router = express.Router();

router.post('/signup', handleUserSignup);
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;

