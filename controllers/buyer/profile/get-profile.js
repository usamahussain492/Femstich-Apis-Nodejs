const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
  
      const user = await User.findOne({ _id: req.user._id}).populate({
        path: "favoritesUser",
        select: "username profileImage"
      })
  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Get User Profile found successfully",
        result: user,
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
  