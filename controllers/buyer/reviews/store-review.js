const Product = require("../../../models/Product");
const Review = require("../../../models/Review");
const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");



module.exports = async (req, res) => {
    try {

        let store = await Store.findOne({_id:req.body.storeId});
        if(!store){
            throw new Error("You don't have any product with this id.")
        }

        const review = await Review.create({
            stars: req.body.stars,
            description: req.body.description
        })

        store.reviews.push(review._id);
        await store.save();
        
        return res.status(200).json({
            code : 200,
            status: true,
            message: "store review added  successfully",
            result: {
                store,
            }
        });

    } catch (error) {
        sendErrorResponse(res,400,"Failed to add review to this store." , error.message)
    }
}