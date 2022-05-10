const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const AccountModel = require("../models/accountModel");

const initPassportLocal = () => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        AccountModel.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    passport.use(
        new LocalStrategy(function (username, password, done) {
            // username unique
            AccountModel.find({
                where: {
                    username: username,
                },
            })
                .then(function (user) {
                    if (user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Incorrect username and password" });
                    }
                    // bcrypt.compare(password, user.password, function (err, result) {
                    //     if (err) {
                    //         return done(err);
                    //     }
                    //     if (!result) {
                    //         return done(null, false, { message: "Incorrect username and password" });
                    //     }
                    //     return done(null, user);
                    // });
                })
                .catch(function (err) {
                    return done(err);
                });
        })
    );
};

module.exports = initPassportLocal;
