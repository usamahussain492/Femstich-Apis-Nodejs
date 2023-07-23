const User = require("../../models/User");
const createToken = require("../../utils/create-token");
const sendErrorResponse = require("../../utils/send-error-response")

module.exports = async (req, res) => {
    try {
        const {userId, password} = req.body;
        const user = await User.findOne({_id: userId});
        if(!user){
            throw new Error("User not found.please verify your OTP again.")
        }
        user.password = password;
        await user.save();
        const token = await createToken(user._id)
        return res.status(200).json({
            code : 200,
            status: true,
            message: "User password changed successfully",
            result: {
                user: await User.findOne({_id: user._id}).select("username email profileImage"),
                token: token
            }
        })

    } catch (error) {
        sendErrorResponse(res,400,"Failed to create your account." , error.message)
    }
}