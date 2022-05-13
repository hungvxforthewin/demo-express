/**
 * Created by hungvx's author on 16/10/2019.
 * src/server6.js
 * passport-JWT
 */
const express = require("express");
const logger = require("winston");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const { config } = require("./middleware/config");
const { applyPassportStrategy } = require("./middleware/PassportJwtMiddleware");
const { catController } = require("./controllers/catController");

const passportJwtRouter = require("./routers/passportJwtRouter");
const { connectDatabase } = require("./config/connectDB");

const app = express();
// Set up CORS
app.use(cors());
// Apply strategy to passport
applyPassportStrategy(passport);
// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request, form submit
app.use(express.json()); //post raw json (application/json)
app.use(express.urlencoded({ extended: false })); //post x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Khởi tạo các routes cho ứng dụng
app.get("/hello", (req, res) => {
    res.send("Hello World! <3");
});
// API Route
// app.use("/", userController);
passportJwtRouter(app);

// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
/**
 * Get port from environment and store in Express.
 */
const { port } = config.env;
// connect database
// connectDatabase(); mock data
app.listen(port, () => {
    logger.info(`Started successfully server at port ${port}`);
    // mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    //     logger.info(`Conneted to mongoDB at ${mongoHostName}`);
    // });
});
