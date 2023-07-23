const BuyerOrder = require("../../../models/BuyerOrder");
const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    let sellerOrder = await SellerOrder.findOne({ _id: req.params.id });
    if(!sellerOrder){
        throw new Error("Couldn't find your order having id " + req.params.id)
    }

    sellerOrder.status = req.params.status;
    await sellerOrder.save();

    let buyerOrder = await BuyerOrder.findOne({ _id: sellerOrder.buyerOrder });
    if(buyerOrder){
        for(let sellerItem of sellerOrder.products){
            for(let buyerItem of buyerOrder.products){
                if(sellerItem.product == buyerItem.product){
                    buyerOrder.products.buyerItem.status = req.params.status;
                    await buyerOrder.save();
                }
            }
        }
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "orders updated successfully",
      result: sellerOrder,
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to update the orders.", error.message);
  }
};
