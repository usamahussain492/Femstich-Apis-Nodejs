const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const sendErrorResponse = require("../../../utils/send-error-response")


module.exports = async (req, res) => {
    try {
        const categories = await Category.find({});
        const trending_products = await Product.find({}).sort({ sales: -1 }).limit(10)
        const poplar_products = await Product.find({}).sort({ averageRating: -1 }).limit(10)
        const featured_products = await Product.find({}).sort({createdAt: -1});

        const all_featured_products = [];
        const favorites = req.user.favorites;

        for(let product of featured_products){
            if(favorites.includes(product._id)){
                all_featured_products.push({
                    like: true,
                    product: product
                });
            }else{
                all_featured_products.push({
                    like: false,
                    product: product
                });
            }
        }
        
        return res.status(200).json({
            code : 200,
            status: true,
            message: "home details fetched successfully",
            result: {
                categories,
                trending_products,
                poplar_products,
                all_featured_products
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to get home details." , error.message)
    }
}