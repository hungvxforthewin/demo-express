const express = require("express");
const app = express();
const port = 3000;
const apiRouter = require("./routers/apiRouter");
const { connectDatabase } = require("./config/connectDB");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// config
app.use(express.json());
// initial data
app.use(initUser);
// connect database
connectDatabase();
app.use("/api/v1/", apiRouter);

function initUser(req, res, next) {
    let userId = req.body.id;
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
