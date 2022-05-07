const express = require("express");
const router = express.Router();
//const faker = require("faker");
const accountModel = require("../models/accountModel");
// pagination
router.get('/', (req, res, next) => {
    let perPage = 16; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1; 
  
    accountModel
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, products) => {
        accountModel.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
           //res.send(products) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
           res.render('account/index', {
            products, // sản phẩm trên một page
            current: page, // page hiện tại
            pages: Math.ceil(count / perPage) // tổng số các page
          });
        });
      });
  });
module.exports = router;