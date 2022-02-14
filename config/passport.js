const GoogleOAuth = require('passport-google-oauth20');
const User = require('../models/User');

module.exports = function (passport) {
  var strategyOptions = {
    clientID: "YOUR CLIENT ID",
    clientSecret: "YOUR CLIENT SECRET",
    callbackURL: "/auth/google/callback"
  }

  passport.use(
    new GoogleOAuth.Strategy(strategyOptions, async (accessToken, refreshToken, profile, done) => {
      try {
        let userInfo = await User.findOne({ googleId: profile.id });
        if (!userInfo) {
          userInfo = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0].value
          });
        }
        done(null, userInfo);
      } catch (err) {
        console.error(err);
      }
    })
  )

  // serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  // deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  })
}