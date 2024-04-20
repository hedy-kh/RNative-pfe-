const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/users');
require('dotenv').config();
passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/user/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let currentUser = await User.findOne({ googleId: profile.id });
  
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const existingUser = await User.findOne({ email: profile.emails[0].value });
  
          if (existingUser) {
            return done(null, false, { message: 'This email is already registered with a normal account.' });
          } else {
            const newUser = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id
            });
            await newUser.save();
            return done(null, newUser);
          }
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  
  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/user/auth/facebook/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOrCreate({ facebookId: profile.id });
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
  