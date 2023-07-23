
const Product = require("../../../models/Product");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let product = await Product.findOne({_id:req.params.id});
        if(!product){
            throw new Error("You don't have any product with this id.")
        }

        
       product = await Product.updateOne({_id:req.params.id},req.body);
        

        return res.status(200).json({
            code : 200,
            status: true,
            message: "product updated successfully",
            result: {
                product,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to edit the product." , error.message)
    }
}