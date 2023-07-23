const Product = require("../../../models/Product");
const { uploadFile } = require("../../../utils/uploadImage");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let product = await Product.findOne({_id:req.params.id});
        if(!product){
            throw new Error("You don't have any product with this id.")
        }

        let images = []
        for(let i = 0; i<req.files.length; i++){
            const { Location } = await uploadFile(req.files[i]);
            images.push(Location);
        }
        
        product.images = images;
        await product.save();

        return res.status(200).json({
            code : 200,
            status: true,
            message: "product images uploaded successfully",
            result: {
                product,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to upload the images of the product." , error.message)
    }
}