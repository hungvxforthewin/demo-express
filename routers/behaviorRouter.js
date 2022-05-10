/**
 * Created by hungvx's author on 16/10/2019.
 * src/routes/api.js
 * use server5.js for fetch, axios
 */
const express = require("express");
const router = express.Router();

/**
 * Init all APIs on your application
 * @param {*} app from express
 */

const retailAPIs = (app) => {
    app.get("/home", function (req, res) {
        res.json({ mess: "home" });
    });
    app.post("/login", function (req, res) {
        res.json({ mess: "login from api web retail" });
    });

    return app.use("/", router); //default
    // app.use("/common", importRouter); // đưa luôn vào server.js or export thành function, call và pass app tại server.js
    // return app.use("/retail", router); // not http://localhost:3000/retail/home
};

module.exports = retailAPIs;
