const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const apiRouter = require("./routers/apiRouter");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(express.json());
app.use(initUser);
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
