const { Strategy, ExtractJwt } = require("passport-jwt");
const { config, underscoreId } = require("./config");
const { User } = require("../models/accountModel");
exports.applyPassportStrategy = (passport) => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.passport.secret;
    passport.use(
        new Strategy(options, (payload, done) => {
            // hard code, mock data
            if (payload.email === "hungvx@gmail.com") {
                return done(null, {
                    email: "hungvx@gmail.com",
                    _id: 1,
                });
            } else {
                return done(err, false);
            }
            // query with database
            // User.findOne({ email: payload.email }, (err, user) => {
            //     if (err) {
            //         return done(err, false);
            //     }
            //     if (user) {
            //         return done(null, {
            //             email: user.email,
            //             _id: user[underscoreId],
            //         });
            //     }
            //     return done(null, false);
            // });
        })
    );
};
