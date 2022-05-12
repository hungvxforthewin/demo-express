// passport-JWT
/**
 * Created by hungvx's author on 16/10/2019.
 * src/server6.js
 */
const express = require("express");
const app = express();

const passportJwtRouter = require("./routers/passportJwtRouter");

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());

// Khởi tạo các routes cho ứng dụng
app.get("/hello", (req, res) => {
    res.send("Hello World! <3");
});
passportJwtRouter(app);

// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
const port = 8020;
app.listen(port, () => {
    console.log(`Hello there, I'm running at localhost:${port}/`);
});
