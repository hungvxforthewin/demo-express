/**
 * Use passport with JWT token
 * Authentication, authorization
 * https://hocweb.vn/cach-su-dung-passport-jwt-trong-nodejs/
 *
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
    app.get("/login", function (req, res) {
        res.json({ mess: "login from passport-jwt" });
    });
    return app.use("/", router);
};

module.exports = initAPIs;
