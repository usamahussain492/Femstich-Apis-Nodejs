const Product = require("../../../models/Product");
const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findOne({ _id: storeId })
      .populate({
        path: "userId",
        select: "username profileImage email",
      })
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: "username profileImage",
        },
      })
      .select("-products");
    const featured_products = await Product.find({ storeId: storeId }).sort({
      createdAt: -1,
    });

    const all_featured_products = [];
    const favorites = req.user.favorites;

    for (let product of featured_products) {
      if (favorites.includes(product._id)) {
        all_featured_products.push({
          like: true,
          product: product,
        });
      } else {
        all_featured_products.push({
          like: false,
          product: product,
        });
      }
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "home details fetched successfully",
      result: {
        store,
        store_products: all_featured_products,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to get home details.", error.message);
  }
};
