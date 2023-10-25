const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (req.path !== '/user/login' && req.path !== '/user/signup' && !req.path.includes('postman')) {
        if (!userUid) {
            return res.redirect("/user/login");
        }

        const user = getUser(userUid);
        if (!user) {
            return res.redirect('/user/signup');
        }

        req.user = user;
    }
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
};

