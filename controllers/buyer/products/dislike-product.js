const Product = require("../../../models/Product");
const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    
    
    const userId = req.user._id;
    let id = req.params.id;
      let product = await Product.findOne({ _id: id });
      if (!product) {
        throw new Error("product not found "+id+".");
      }
      await User.findByIdAndUpdate(userId, { $pull: { favorites: product._id } }, { new: true });

    
    const user = await User.findById(userId).select("favorites").populate({
      path: "favorites",
      select: "title description price images"
    })

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Product disliked successfully",
      result: {
        favourites: user.favorites,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to dislike the product by this id.",
      error.message
    );
  }
};
