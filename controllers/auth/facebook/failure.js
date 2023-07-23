const sendErrorResponse = require("../../../utils/send-error-response")

module.exports = async (req, res) => {
    try {
        
        return res.status(400).json({
            code : 400,
            status: false,
            message: "User not logged in.",
           
        }) 
        
    } catch (error) {
        sendErrorResponse(res,400,"Failed to login with your credentials." , error.message)
    }
}