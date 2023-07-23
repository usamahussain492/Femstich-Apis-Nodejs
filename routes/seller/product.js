const express = require('express');
const authorize = require('../../middlewares/authorize');
const { AddProduct, DeleteProduct, EditProduct, GetProduct, ProductImages } = require('../../controllers/seller');
const multer = require('../../utils/multer');
const router = express.Router()
 
router.post("/", authorize, AddProduct);
router.put("/:id",authorize, EditProduct);
router.delete("/:id",authorize, DeleteProduct);
router.get("/:id",authorize, GetProduct);
router.put("/:id/image",authorize, multer.array("image"),ProductImages);

 // {
    //   "name": "image",
    //   "description": "Upload an image file. File size limit is 3MB. Only '.jpg' is allowed ",
    //   "required": true,
    //   "allowMultiple": true,
    //   "in": "formData",
    //   "type":"array", 
    //   "items":{
    //     "type":"file"
    //   },
    //   "paramType": "form"
    // }


module.exports = router