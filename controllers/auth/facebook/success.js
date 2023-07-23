const User = require("../../../models/User");
const createToken = require("../../../utils/create-token");
const sendErrorResponse = require("../../../utils/send-error-response")


module.exports = async (req, res) => {
    try {
        const user = req.user;
        const token = await createToken(user._id)
        return res.status(200).json({
            code : 200,
            status: true,
            message: "User successfully logged in.",
            result: {
                user: await User.findOne({_id: user._id}).select("username facebookId profileImage"),
                token: token
            }
        }) 
        
    } catch (error) {
        sendErrorResponse(res,400,"Failed to login with your credentials." , error.message)
    }
}