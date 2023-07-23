const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let category = await Category.find({}).populate(
            {
                path:"subcategories",
                select:"title"
            }
        );
       
        return res.status(200).json({
            code : 200,
            status: true,
            message: "Category get successfully",
            result: {
                category,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to get the category." , error.message)
    }
}