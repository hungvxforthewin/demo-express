const express = require("express");
const router = express.Router();
const AccountModel = require("../models/accountModel");

// RESRful APIs

// GET
router.get("/", (req, res) => {
    AccountModel.find({})
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            return res.status(500).json("error server");
        });
});

// GET :id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    AccountModel.findOne({ _id: id })
        .then((data) => {
            if (data) {
                return res.json(data);
            } else {
                return res.status(404).json("not found");
            }
        })
        .catch((err) => {
            return res.status(500).json("error server");
        });
});

// POST
router.post("/register", (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json("param is valid");
    }

    AccountModel.findOne({
        username: username,
    })
        .then((data) => {
            if (data) {
                //return res.json("user exists");
                return Promise.resolve({ status: false, mess: "exists" });
            } else {
                return AccountModel.create({
                    username: username,
                    password: password,
                });
            }
        })
        .then((data) => {
            // status default 200
            if (!data.status && data.status !== undefined) {
                return res.json("user exists");
            } else if (data) {
                return res.json("success");
            }
        })
        .catch((err) => {
            if (err) {
                return res.status(500).json("server error");
            }
        });
});

// PUT


router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json("param is valid");
    }
    AccountModel.findOne({
        username: username,
        password: password,
    })
        .then((data) => {
            if (data) {
                return res.json({ mess: "login sucess" });
            } else {
                return res.json({ mess: "login false" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ mess: "server error" });
        });
});

router.get("/", (req, res) => {
    res.json("this is page account");
});

module.exports = router;
