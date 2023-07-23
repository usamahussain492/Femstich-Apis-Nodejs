const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv/config");
const app = require("./../index");
const session = require("express-session");
const User = require("../models/User");

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // if user already exist in your dataabse login otherwise
      // save data and signup
      const userData = profile._json;
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create({
          username: userData.name,
          email: userData.email,
          password: userData.sub,
          profileImage: userData.picture,
        });
        return done(null, user);
      } else {
        user.username = userData.name;
        user.password = userData.sub;
        user.profileImage = userData.picture;
        await user.save();
        return done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "3782316728723206",
      clientSecret: "446b2a773bf99bd04bba6abe1029e3d7",
      callbackURL: "http://localhost:9000/api/auth/facebook/callback",
      profileFields: ["id", "email", "name", "picture"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return cb(err, user);

      // });
      const facebookId = profile.id;
      const firstname = profile.name.givenName ? profile.name.givenName : "";
      const middlename = profile.name.middleName ? profile.name.middleName : "";
      const lastname = profile.name.familyName ? profile.name.familyName : "";
      const username = firstname + " " + middlename + " " + lastname;
      const profileImage = profile.photos[0].value;


      let user = await User.findOne({ facebookId: facebookId });
      if(!user){
        let user = await User.create({
          facebookId: facebookId,
          username: username,
          profileImage: profileImage,
          password: facebookId
        });
        return cb(null, user)
      }
      user.facebookId = facebookId
      user.username = username;
      user.profileImage = profileImage;
      await user.save();
      return cb(null, user);
    }
  )
);

module.exports = passport;
