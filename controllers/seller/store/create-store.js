const Store = require("../../../models/Store");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user._id });
    if (store) {
      throw new Error("You already have a store.");
    }
    
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.phoneNumber ||
      !req.body.links
    ) {
      throw new Error(
        "Please enter a title, description, phone number and links"
      );
    }

    const newStore = await Store.create({
        userId:req.user._id,
        title:req.body.title,
        description:req.body.description,
        phoneNumber: req.body.phoneNumber,
        links: req.body.links
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "store created successfully",
      result: {
        store:newStore,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to create the store.", error.message);
  }
};
