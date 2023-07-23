const Address = require("../../../models/Address");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { address, city, province, is_default } = req.body;

    const user_address = await Address.create({
      userId: req.user._id,
      name: req.body.name?req.body.name:"",
      phoneNo: req.body.phoneNo?req.body.phoneNo:"",
      address,
      city,
      province,
      default: is_default,
    });
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Address created successfully",
      result: {
        address: await Address.find({ userId: req.user._id }),
      },
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to add the address.", error.message);
  }
};
