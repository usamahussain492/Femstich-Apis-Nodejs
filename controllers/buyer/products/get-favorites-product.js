const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    console.log("get favorite products")
    const user = await User.findOne({ _id: req.user._id }).select("favorites")
    .populate({
      path: "favorites",
      select: "title description price images",
    });

     

    if (user.favorites.length > 0) {
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Favorites Product found successfully",
        result: {
          favourites: user.favorites,
        },
      });
    }else{
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Favorites Product found successfully",
        result: {
          favourites: [],
        },
      });
    }
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to find the favorites products.",
      error.message
    );
  }
};
