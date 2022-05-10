/**
 * Created by hungvx's author on 16/10/2019.
 * src/routes/api.js
 * use server4.js for passport local
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const initPassportLocal = require("../helpers/passportLocal.helper");
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
initPassportLocal();
let initAPIs = (app) => {
    app.get("/login", function (req, res) {
        res.json({ mess: "login from passport" });
    });

    app.post("/login", passport.authenticate("local", { successReturnToOrRedirect: "/", failureRedirect: "/login" }));

    return app.use("/", router);
};

module.exports = initAPIs;
