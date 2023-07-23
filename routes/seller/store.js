const express = require('express');
const authorize = require('../../middlewares/authorize');
const { CreateStore, EditStore, ChangeImage, GetStore } = require('../../controllers/seller');
const multer = require('../../utils/multer');
const router = express.Router()
 
router.post("/", authorize,CreateStore);
router.put("/",authorize, EditStore);
router.get("/", authorize, GetStore);
router.put("/change/image",authorize,multer.single("image"),ChangeImage)


module.exports = router