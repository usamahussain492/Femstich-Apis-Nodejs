const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
      
  
      const sellerOrder = await SellerOrder.deleteOne({
        _id: req.params.id
      })

  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "orders deleted successfully",
        result: sellerOrder,
      });
  
    } catch (error) {
      sendErrorResponse(
        res,
        400,
        "Failed to delete the orders.",
        error.message
      );
    }
  };
  