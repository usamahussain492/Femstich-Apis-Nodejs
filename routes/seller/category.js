const express = require('express');
const authorize = require('../../middlewares/authorize');
const { AddCategory, GetCategory } = require('../../controllers/seller');
const router = express.Router()
 
router.post("/", authorize, AddCategory);
router.get("/",authorize, GetCategory);


module.exports = router