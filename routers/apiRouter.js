const express = require("express");
const router = express.Router();

const middle = (req, res, next) => {
    console.log("middle 1");
    next();
};

router.get("/users", middle, (req, res) => {
    const param = req.body.id;
    console.log("id param: ", param);
    console.log("body: ", req.body);
    console.log("params: ", req.params);
    console.log("users: ", req.user);
    res.status(777).json("list user");
});

router.post("/users", middle, (req, res) => {
    const param = req.body.id;
    console.log("id param: ", param);
    console.log("body: ", req.body);
    console.log("params: ", req.params);
    console.log("users: ", req.user);
});

router.get("/user/:id", (req, res) => {
    res.json("user has id " + req.params.id);
});

module.exports = router;
