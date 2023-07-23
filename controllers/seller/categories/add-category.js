const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let category = await Category.findOne({title: req.body.title});
        if(category){
            throw new Error("This Category already exists.")
        }

        category = await Category.create({title: req.body.title});

        return res.status(200).json({
            code : 200,
            status: true,
            message: "Category created successfully",
            result: {
                category,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to add the category." , error.message)
    }
}