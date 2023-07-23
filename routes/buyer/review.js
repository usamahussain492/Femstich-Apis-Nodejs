const express = require('express');
const { ProductReview, StoreReview } = require('../../controllers/buyer');
const authorize = require('../../middlewares/authorize');
const router = express.Router()
 
router.post("/product",authorize, ProductReview);
router.put("/store",authorize, StoreReview);



module.exports = router