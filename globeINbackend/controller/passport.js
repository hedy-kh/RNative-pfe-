
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/users');

passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          username: profile.displayName,
          googleId: profile.id
        });
        await user.save();
      }
      done(null, user);
    })
  );
  

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = new User({
          username: profile.displayName,
          facebookId: profile.id
        });
        await user.save();
      }
      done(null, user);
    })
  );
  