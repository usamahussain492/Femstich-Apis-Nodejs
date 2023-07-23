const User = require("../../../models/User");
const sendErrorResponse = require("../../../utils/send-error-response");
const { uploadFile } = require("../../../utils/uploadImage");

module.exports = async (req, res) => {
  try {
    const { Location } = await uploadFile(req.file);
    await User.findByIdAndUpdate(req.user._id, { profileImage: Location });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "image uploaded successfully",
      result: {
        profileImage: Location,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to upload image.", error.message);
  }
};
