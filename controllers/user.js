const User = require('../models/user');
const { setUser } = require('../service/auth');
const { use } = require('../routes');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');
}


async function handleUserLogin(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    console.log('Invalid credentials. No user found.');
    return res.render('login', {
      alert: 'Invalid Username or Password',
    });
  }

  const token = setUser(user);
  res.cookie('uid', token);
  return res.redirect('/');
}
async function handleUserLogout(req, res) {

  res.clearCookie('uid');
  return res.redirect('/login');
}


module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
};

