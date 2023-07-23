const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    console.log("user change details api")
    await User.findByIdAndUpdate(req.user._id, req.body);
    const variables = Object.keys(req.body).join(" ").toString();
    return res.status(200).json({
      code: 200,
      status: true,
      message: "profile data changed successfully",
      result: {
        user: await User.findById(req.user._id).select(variables),
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to change data.", error.message);
  }
};
