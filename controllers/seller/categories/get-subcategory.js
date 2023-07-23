const Category = require("../../../models/Category");
const Subcategory = require("../../../models/Subcategory");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let subcategory = await Subcategory.find({})
       
        return res.status(200).json({
            code : 200,
            status: true,
            message: "SubCategory get successfully",
            result: {
                subcategory,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to get the Subcategory." , error.message)
    }
}