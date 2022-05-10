let logOut = (req, res) => {
    req.logout();
    return res.redirect("/login-register");
};
let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login-register");
    }
    next();
};
let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};
module.exports = {
    logOut: logOut,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
};
