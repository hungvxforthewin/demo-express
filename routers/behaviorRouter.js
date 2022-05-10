/**
 * Created by hungvx's author on 16/10/2019.
 * src/routes/api.js
 * use server4.js for fetch, axios
 */
const express = require("express");
const router = express.Router();

/**
 * Init all APIs on your application
 * @param {*} app from express
 */

let initAPIs = (app) => {
    app.get("/home", (req, res) => {
        res.json({ mess: "home" });
    });
    app.post("/login", function (req, res) {
        res.json({ mess: "login from api web retail" });
    });

    return app.use("/retail/", router);
};

module.exports = initAPIs;
