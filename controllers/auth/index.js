module.exports= {

    // auth
    Login: require("./login"),
    SignUp: require("./signup"),
    GetCode: require("./get-code"),
    VerifyCode: require("./verify-code"),
    ResetPassword: require("./reset-password"),

    LoginWithGmail: require("./gmail/google"),
    LoginWithGmailCallback: require("./gmail/callback"),
    LoginWithGmailCallbackSuccess: require("./gmail/success"),
    LoginWithGmailCallbackFailure: require("./gmail/failure"),

    LoginWithFacebook: require("./facebook/facebook"),
    LoginWithFacebookCallback: require("./facebook/callback"), 
    LoginWithFacebookCallbackSuccess: require("./facebook/success"),
    LoginWithFacebookCallbackFailure: require("./facebook/failure"),
    
}