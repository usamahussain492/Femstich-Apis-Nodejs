const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const product = await Product.findOne({
      title: { $regex: req.params.text },
      price: {
        $lte: req.query.lte_price,
        $gte: req.query.gte_price,
      },  
      averageRating: {
        $lte: req.query.lte_avg_r,
        $gte: req.query.gte_avg_r,
      },
    })
      .sort({ price: req.query.sort, averageRating: req.query.sort })
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: "username profileImage",
        },
      })
      .populate({
        path: "category",
        select: "title",
      })
      .populate({
        path: "subcategory",
        select: "title",
      })
      .populate({
        path: "storeId",
        select: "title description",
      });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Product fetched successfully",
      result: {
        product,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get product by this text.",
      error.message
    );
  }
};
