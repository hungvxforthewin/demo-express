const express = require("express");
const router = express.Router();
const path = require("path");

// from ubuntu nên __dirname ko exaclly
// __dirname chuẩn đến router --> move file server
router.get("/index", (req, res) => {
    console.log(__dirname);
    console.log(__filename);
    return res.sendFile(path.join(__dirname, "/views/home/index.html"));
})

module.exports = router;