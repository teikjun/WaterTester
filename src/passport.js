var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("./models/user");

// set up passport configs
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // look up the user in the database
      User.findOne({ googleid: profile.id })
        .then(user => {
          if (user) {
            return user;
          } else {
            // create user if doesn't exist yet
            const user = new User({
              name: profile.displayName,
              googleid: profile.id,
              adjective: null,
              color: null
            });

            return user.save();
          }
        })
        .then(user => done(null, user))
        .catch(err => {
          console.log(err);
          done(err);
        });
    }
  )
);

//saves user info so you don't have to keep logging in again - cookies
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
