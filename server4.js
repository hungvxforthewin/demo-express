// passport-session
/**
 * Created by hungvx's author on 16/10/2019.
 * src/server.js
 */
const express = require("express");
const app = express();
const expressSession = require("express-session");
const passport = require("passport");

const initAPIs = require("./routers/passportLocalRouter");
const retailAPIs = require("./routers/behaviorRouter");

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json())
// Config session
app.use(expressSession({ secret: "secret", saveUninitialized: true, resave: true, cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: false, secure: false } }));
// Config passport
app.use(passport.initialize());
app.use(passport.session());
// Khởi tạo các routes cho ứng dụng
initAPIs(app);
retailAPIs(app);

// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
const port = 8018;
app.listen(port, () => {
    console.log(`Hello there, I'm running at localhost:${port}/`);
});
