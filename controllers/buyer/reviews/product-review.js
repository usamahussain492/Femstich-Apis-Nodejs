const Product = require("../../../models/Product");
const Review = require("../../../models/Review");
const sendErrorResponse = require("../../../utils/send-error-response");



module.exports = async (req, res) => {
    try {

        let product = await Product.findOne({_id:req.body.productId});
        if(!product){
            throw new Error("You don't have any product with this id.")
        }

        const review = await Review.create({
            stars: req.body.stars,
            description: req.body.description
        })

        product.reviews.push(review._id);
        await product.save();
        
        return res.status(200).json({
            code : 200,
            status: true,
            message: "product review added  successfully",
            result: {
                product,
            }
        });

    } catch (error) {
        sendErrorResponse(res,400,"Failed to add review to this product." , error.message)
    }
}