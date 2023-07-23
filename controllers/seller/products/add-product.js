const Product = require("../../../models/Product");
const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");


module.exports = async (req, res) => {
    try {
        let store = await Store.findOne({userId: req.user._id});
        if(!store){
            throw new Error("You don't have any store.")
        }

       

        const product = await Product.create({
            title: req.body.title,
            userId: req.user._id,
            description: req.body.description,
            color: req.body.color,
            sizes: req.body.sizes,
            price: req.body.price,
            stock: req.body.stock,
            featured: req.body.featured,
            storeId: store._id,
            category: req.body.category,
            subcategory: req.body.subcategory,
            customization: req.body.customization,
            customizationPrice: req.body.customization.length>0?req.body.customizationPrice:0,
        })
        
        store.products.push(product._id);
        await store.save();

        return res.status(200).json({
            code : 200,
            status: true,
            message: "product created successfully",
            result: {
                product,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to add the product." , error.message)
    }
}