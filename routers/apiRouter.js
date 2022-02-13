const express = require("express");
const router = express.Router();

router.get("/router", (req, res) => {
    res.json("router");
});

router.get("/user/:id", (req, res) => {
    res.json("user has id " + req.params.id);
});

module.exports = router;
