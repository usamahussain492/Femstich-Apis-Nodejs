const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const sendErrorResponse = require("../../../utils/send-error-response")


module.exports = async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id}).populate({
            path: "reviews",
            populate: {
                path: "userId",
                select: "username profileImage"
            }
        }).populate({
            path: "category",
            select: "title"
        }).populate({
            path: "subcategory",
            select: "title"
        }).populate({
            path: "storeId",
            select: "title description"
        });
        
        return res.status(200).json({
            code : 200,
            status: true,
            message: "Product fetched successfully",
            result: {
                product
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to get product by this id." , error.message)
    }
}