const User = require("../../../models/User");
const createToken = require("../../../utils/create-token");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new Error("User not found.");
    }
    user.password = req.body.password;
    await user.save();
    const token = await createToken(user._id);
    return res.status(200).json({
      code: 200,
      status: true,
      message: "password changed successfully",
      result: {
        token: token,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to change password.", error.message);
  }
};
