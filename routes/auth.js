const express = require("express");
const {
  Login,
  SignUp,
  GetCode,
  VerifyCode,
  ResetPassword,
  LoginWithGmail,
  LoginWithGmailCallback,
  LoginWithGmailCallbackSuccess,
  LoginWithGmailCallbackFailure,
  LoginWithFacebook,
  LoginWithFacebookCallback,
  LoginWithFacebookCallbackSuccess,
  LoginWithFacebookCallbackFailure,
} = require("../controllers/auth");
const router = express.Router();

router.post("/login", Login);
router.post("/sign-up", SignUp);
router.post("/get-otp", GetCode);
router.post("/verify-otp", VerifyCode);
router.post("/reset-password", ResetPassword);

router.get("/google", LoginWithGmail);
router.get("/google/callback", LoginWithGmailCallback);
router.get("/google/callback/success", LoginWithGmailCallbackSuccess);
router.get("/google/callback/failure", LoginWithGmailCallbackFailure);

router.get("/facebook", LoginWithFacebook);
router.get("/facebook/callback",LoginWithFacebookCallback);
router.get("/facebook/callback/success",LoginWithFacebookCallbackSuccess);
router.get("/facebook/callback/failure",LoginWithFacebookCallbackFailure);

module.exports = router;
