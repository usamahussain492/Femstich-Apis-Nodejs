const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");
const { uploadFile } = require("../../../utils/uploadImage");

module.exports = async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user._id })
      .populate({
        path: "userId",
        select: "username profileImage email",
      })
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: "username profileImage",
        },
      })
      .populate({
        path: "products",
      });
    if (!store) {
      throw new Error("You don't have a store.");
    }
    const { Location } = await uploadFile(req.file);

    store.logo = Location;
    await store.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "store logo updated successfully",
      result: {
        store,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to upload the store logo.",
      error.message
    );
  }
};
