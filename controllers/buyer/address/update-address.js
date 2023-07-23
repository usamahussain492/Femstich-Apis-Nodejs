const Address = require("../../../models/Address");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { address, city, province, is_default } = req.body;
    console.log(req.params.id)
    const user_address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user_address) {
      throw new Error("Address not found.");
    }
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Address updated successfully",
      result: {
        address: await Address.find({ userId: req.user._id }),
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to update the address.", error.message);
  }
};
