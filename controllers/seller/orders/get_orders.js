const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
      
      const userId = req.user._id;
  
      const sellerOrder = await SellerOrder.find({
        seller: userId,
      }).populate({
          path:"products.product",
      }).populate({
        path:"shippingAddress"
      }).populate({
        path: "buyer"
      });

      let pending = sellerOrder.filter(order => order.status == "pending");
      let inProgress = sellerOrder.filter(order => order.status == "inProgress");
      let completed = sellerOrder.filter(order => order.status == "completed");
      let dilevered = sellerOrder.filter(order => order.status == "dilevered");
      let cancelled = sellerOrder.filter(order => order.status == "cancelled");;
  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "orders get successfully",
        result: {
            pending: pending,
            inProgress: inProgress,
            completed: completed,
            dilevered: dilevered,
            cancelled: cancelled
        },
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
  