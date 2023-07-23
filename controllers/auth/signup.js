const User = require("../../models/User");
const createToken = require("../../utils/create-token");
const sendErrorResponse = require("../../utils/send-error-response")

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({
            $or:[
                {username: username},
                {email: email},
            ]
        });
        if(user){
            throw new Error("This username or email is already exists. Please try a unique one.")
        }
        const newUser = await User.create({username, email,password});
        const token = await createToken(newUser._id);

        return res.status(201).json({
            code : 201,
            status: true,
            message: "User created successfully",
            result: {
                user: await User.findOne({_id: newUser._id}).select("username email profileImage"),
                token: token
            }
        })
        
    } catch (error) {
        sendErrorResponse(res,400,"Failed to create your account.",error.message)
    }
}