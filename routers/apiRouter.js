const express = require("express");
const router = express.Router();

let middle = (req, res, next) => {
    console.log("middle 1");
    next();
};

router.get("/users", middle, (req, res) => {
    res.json("list user");
});

router.get("/user/:id", (req, res) => {
    res.json("user has id " + req.params.id);
});

module.exports = router;
