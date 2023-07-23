const BuyerOrder = require("../../../models/BuyerOrder");
const Product = require("../../../models/Product");
const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    
    const userId = req.user._id;

    const buyerOrder = await BuyerOrder.find({
      buyer: userId,
    }).populate({
        path:"products.product",
    }).populate({
      path: "shippingAddress"
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "orders get successfully",
      result: buyerOrder,
    });

  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get the orders.",
      error.message
    );
  }
};
