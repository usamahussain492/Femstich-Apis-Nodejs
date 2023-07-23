const User = require("../../../models/User");
const sendEmail = require("../../../utils/send-email");
const sendErrorResponse = require("../../../utils/send-error-response");
require("dotenv/config");

module.exports = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).send({
        success: false,
        message: "Name, email, and message are required fields.",
      });
    }
    sendEmail({
        from: `"${req.body.name}" <${req.body.email}>`,
      email: process.env.SMPT_MAIL,
      subject: "Call For Help",
      message:
        "Hi Femstich!\n" + "\nName: "+ req.body.name + "\nEmail: "+ req.body.email + "\nMessage: "+ req.body.message,
    });
    sendEmail({
        from:  process.env.SMPT_MAIL,
        email: req.body.email,
        subject: "no-reply",
        message: "Hi " + req.user.username + "!\n We just recieved an Email.We will contact you soon.\n Thank you very much.",
      });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Your message is dileverd to us.Thanks for contacting us.",
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to change password.", error.message);
  }
};
