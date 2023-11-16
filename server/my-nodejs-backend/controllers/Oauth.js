const passport = require("passport");
require("dotenv").config();
const Customer = require("../models/Customer");

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    //   callbackURL:
    //     "http://localhost:3125/customers/api/account/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("_json ", profile);
      // Assuming `profile` contains the user's email
      Customer.findOrCreate(
        { email: profile.emails[0].value },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);
const auth = () => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};
const googleCall = (req, res) => {
  passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    };
};

module.exports = {
  auth,
  googleCall,
};
