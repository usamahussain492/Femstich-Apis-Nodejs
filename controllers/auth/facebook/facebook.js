
const passport = require("../../../utils/passport");

module.exports = passport.authenticate("facebook",{ scope: ["email"] });
// , {
//   scope: ["profile", "email"],
// }