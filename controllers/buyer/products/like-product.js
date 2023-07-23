const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      throw new Error("product not found.");
    }

    let userData = await User.findOne({ _id: req.user._id });
    if (userData.favorites.length > 0) {
      userData.favorites.push(product._id);
    } else {
      userData.favorites = [product._id];
    }
    await userData.save();

    const user = await User.findOne({ _id: req.user._id })
      .select("favorites")
      .populate({
        path: "favorites",
        select: "title description price images",
      });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Product liked successfully",
      result: {
        favourites: user.favorites,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to like the product by this id.",
      error.message
    );
  }
};
