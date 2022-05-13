/**
 * Use passport with JWT token
 * Authentication, authorization
 * https://hocweb.vn/cach-su-dung-passport-jwt-trong-nodejs/
 *
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const catController = require("../controllers/catController");
const { generateHashedPassword, generateServerErrorCode, registerValidation, loginValidation } = require("../helpers/utils");

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
    app.get("/home", function (req, res) {
        res.json({ mess: "login from passport-jwt" });
    });

    app.post("/login", loginValidation, catController.loginCatController);

    return app.use("/", router);
};

module.exports = initAPIs;
