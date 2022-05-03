const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
// const apiRouter = require("./routers/apiRouter");
// const demoRouter = require("./routers/demoRouting");
const { apiRouter, demoRouter, accountRouter } = require("./routers/index");

const { connectDatabase } = require("./config/connectDB");

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

// config
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //post x-www-form-urlencoded
app.use("/static", express.static("public")); //http://localhost:3000/static/file/test.txt
app.use(express.static("upload")); //http://localhost:3000/keke.txt
app.use("/imagefake", express.static(path.join(__dirname, "image/check"))); //absolute path of the directory

// initial data
app.use("/request", initUser);
app.use(initUser);
// connect database
connectDatabase();

// router
console.log("start");
app.use("/api/v1/", apiRouter);
app.use("/demo-router/", demoRouter);
app.use("/account/", accountRouter);

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
