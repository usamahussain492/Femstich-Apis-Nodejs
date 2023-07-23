const express = require('express');
const router = express.Router()
const store = require('./store');
const address = require('./address');
const profile = require('./profile');
const product = require('./product');
const review = require('./review');
const order = require('./order');


router.use("/address",address);
router.use("/profile",profile);
router.use("/product",product);
router.use("/store",store);
router.use("/review",review);
router.use("/order",order);


module.exports = router