const express = require('express');
const authorize = require('../../middlewares/authorize');
const { GetStoreById } = require('../../controllers/buyer');
const router = express.Router()
 
router.get("/:id",authorize, GetStoreById);


module.exports = router