const express = require("express");
const router = express.Router();
const AccountModel = require("../models/accountModel");

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
            return res.json({ mess: "server error" });
        });
});

router.get("/", (req, res) => {
    res.json("this is page account");
});

module.exports = router;
