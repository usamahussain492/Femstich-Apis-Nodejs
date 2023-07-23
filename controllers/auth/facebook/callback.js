const passport = require("../../../utils/passport")
module.exports =  passport.authenticate( 'facebook', {
    successRedirect: '/api/auth/facebook/callback/success',
    failureRedirect: '/api/auth/facebook/callback/failure'
})