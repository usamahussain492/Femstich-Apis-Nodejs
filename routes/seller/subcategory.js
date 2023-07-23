const express = require('express');
const authorize = require('../../middlewares/authorize');
const { AddSubCategory, GetSubCategory } = require('../../controllers/seller');
const router = express.Router()
 
router.post("/", authorize, AddSubCategory);
router.get("/",authorize, GetSubCategory);


module.exports = router