const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
      const disliked_user = await User.findOne({ _id: req.params.id });
      if (!disliked_user) {
        throw new Error("user to be disliked is not found.");
      }
  
      req.user.favoritesUser.pull(disliked_user._id);
      await req.user.save();
  
      const user = await User.findOne({ _id: req.user._id}).select("favoritesUser").populate({
        path: "favoritesUser",
        select: "username profileImage"
      })
  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "User disliked successfully",
        result: {
          favourites: user.favoritesUser,
        },
      });
    } catch (error) {
      sendErrorResponse(
        res,
        400,
        "Failed to dislike the user by this id.",
        error.message
      );
    }
  };
  