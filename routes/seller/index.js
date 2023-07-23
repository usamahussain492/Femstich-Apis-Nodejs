const express = require('express');
const router = express.Router()
const store = require('./store');
const product = require('./product');
const category = require('./category');
const subcategory = require('./subcategory');
const order = require('./order');

router.use("/store",store);
router.use("/product",product);
router.use("/category",category);
router.use("/subcategory",subcategory);
router.use("/order",order);


module.exports = router