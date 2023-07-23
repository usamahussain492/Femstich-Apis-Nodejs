const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");



module.exports = async (req, res) => {
    try {
        const store = await Store.findOne({userId: req.user._id});
        if(!store){
            throw new Error("Oops! something went wrong.We don't find the store. Please try again")
        }

        const newStore = await Store.updateOne({_id: store._id},req.body);
        

        return res.status(200).json({
            code : 200,
            status: true,
            message: "store created successfully",
            result: {
                store:newStore,
            }
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to edit this store." , error.message)
    }
}