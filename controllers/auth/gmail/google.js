const passport = require("../../../utils/passport");

module.exports = passport.authenticate("google", {
  scope: ["profile", "email"],
});
