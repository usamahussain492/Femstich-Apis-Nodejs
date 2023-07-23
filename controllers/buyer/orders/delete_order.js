const BuyerOrder = require("../../../models/BuyerOrder");
const Product = require("../../../models/Product");
const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    


    const buyerOrder = await BuyerOrder.deleteOne({
      _id: req.params.id
    })

    return res.status(200).json({
      code: 200,
      status: true,
      message: "order deleted successfully",
      result: buyerOrder,
    });

  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to delete the order.",
      error.message
    );
  }
};
