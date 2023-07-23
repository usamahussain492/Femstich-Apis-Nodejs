const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
  
      const user = await User.findOne({ _id: req.user._id}).select("favoritesUser").populate({
        path: "favoritesUser",
        select: "username profileImage"
      })
  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Favorites User found successfully",
        result: {
          favourites: user.favoritesUser,
        },
      });
    } catch (error) {
      sendErrorResponse(
        res,
        400,
        "Failed to found favorites user.",
        error.message
      );
    }
  };
  