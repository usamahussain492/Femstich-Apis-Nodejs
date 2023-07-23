const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");

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
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Oops! something went wrong.We don't find the store. Please try again",
        result: null,
      });
     
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "store created successfully",
      result: {
        store,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to get this store.", error.message);
  }
};
