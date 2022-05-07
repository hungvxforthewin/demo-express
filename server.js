const express = require("express");
require("dotenv").config();
const cors = require('cors')
const path = require("path");
const app = express();
const port = process.env.PORT || 5100;
// const apiRouter = require("./routers/apiRouter");
// const demoRouter = require("./routers/demoRouting");
const { apiRouter, demoRouter, accountRouter, fakeDataRouter, homeRouter, corsRouter } = require("./routers/index");

const { connectDatabase } = require("./config/connectDB");

// app.get("/", (req, res) => {
//     res.send("Hello World! <3");
// });
app.get("/hello", (req, res) => {
    res.send("Hello World! <3");
});
app.get("/cors", (req, res) => {
    return res.sendFile(path.join(__dirname, "/views/home/index.html"));
})

// config
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //post x-www-form-urlencoded
app.use("/static", express.static("public")); //http://localhost:3000/static/file/test.txt
app.use(express.static("upload")); //http://localhost:3000/keke.txt
app.use("/imagefake", express.static(path.join(__dirname, "image/check"))); //absolute path of the directory
// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
// initial data
app.use("/request", initUser);
app.use(initUser);
// connect database
connectDatabase();

// router
console.log("start");
app.use("/", homeRouter);
app.use("/api/v1/", apiRouter);
app.use("/demo-router/", demoRouter);
app.use("/account/", accountRouter);
app.use("/mock/", fakeDataRouter);
app.use("/demo-cors/", corsRouter);

function initUser(req, res, next) {
    console.log("an request");
    let userId = req.body.id;
    console.log("UserId", userId);
    if (userId) {
        req.user = {
            id: userId,
            name: "admin",
        };
    } else {
    }
    next();
}

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});
