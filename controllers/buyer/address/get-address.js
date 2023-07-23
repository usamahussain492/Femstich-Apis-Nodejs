const Address = require("../../../models/Address");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    console.log("api called address get")
    const address = await Address.find({userId: req.user._id}); 
    if (!address) {
        throw new Error("Address not found.");
     }
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Address deleted successfully",
      result: {
        address,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to update the address.", error.message);
  }
};
