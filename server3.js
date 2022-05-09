/**
 * Created by hungvx's author on 16/10/2019.
 * src/server.js
 */
const express = require("express");
const app = express();
const initAPIs = require("./routers/demoAccessRefeshTokenRouter");

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());

// Khởi tạo các routes cho ứng dụng
initAPIs(app);

// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
const port = 8017;
app.listen(port, () => {
    console.log(`Hello there, I'm running at localhost:${port}/`);
});
