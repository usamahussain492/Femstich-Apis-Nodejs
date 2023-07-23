const OTP = require("../../models/OTP");
const User = require("../../models/User");
const generateOtp = require("../../utils/generate-otp");
const sendEmail = require("../../utils/send-email");
const sendErrorResponse = require("../../utils/send-error-response");
require("dotenv/config");

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Don't have any account on that email address.");
    }
    const tokenOtp = await generateOtp();
    const previousToken = await OTP.find({ userId: user._id });
    for (let pt of previousToken) {
      await OTP.deleteOne({ _id: pt._id });
    }
    const Otp = await OTP.create({
      userId: user._id,
      otp: tokenOtp,
    });
    await sendEmail({
      email: email,
      from: process.env.SMPT_MAIL,
      subject: "no-reply OTP",
      message:
        "Hi!" +
        user.username +
        "\n Your OTP is : " +
        tokenOtp +
        ".\n Thanks for your cooperation.",
    }).catch((error) => {
      throw new Error(error.message);
    });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully send OTP to the email.",
      result: {
        email: email,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to send code on your email.",
      error.message
    );
  }
};
