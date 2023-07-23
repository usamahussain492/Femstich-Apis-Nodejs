const passport = require("../../../utils/passport")
module.exports =  passport.authenticate( 'google', {
    successRedirect: '/api/auth/google/callback/success',
    failureRedirect: '/api/auth/google/callback/failure'
})