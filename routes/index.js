const express = require('express');
const router = express.Router()
const auth  = require("./auth");
const seller = require('./seller');
const buyer = require('./buyer');

router.use("/auth",auth);
router.use("/buyer", buyer);
router.use("/seller",seller)


module.exports = router