const passport = require("passport");
require("dotenv").config();
const Customer = require("../models/Customer");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

bcryptSalt = process.env.BCRYPT_SALT;
GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3125/customers/api/account/google",
    },
    async function (accessToken, refreshToken, profile, done) {
      const uniqueId = v4();

      const email = profile._json.email;
      const name = profile;
      const firstName = profile._json.given_name;
      const lastName = profile._json.family_name;
      console.log("email ", email);
      console.log("name", name);
      console.log("firstName", firstName);
      console.log("lastName", lastName);
      // Assuming `profile` contains the user's email
      try {
        NewPassword = v4();
        const hashedPassword = await bcrypt.hash(
          NewPassword,
          Number(bcryptSalt)
        );

        const customer = await Customer.findOne({ email: email });
        if (!customer) {
          const newCustomer = await Customer.create({
            _id: uniqueId,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            valid_account: true,
          });
          await newCustomer.save();
          sendEmail(
            newCustomer.email,
            " New Account Of Goodies",
            {
              name: newCustomer.first_name + " " + newCustomer.last_name,
              email: email,
              password: NewPassword,
            },
            "../utils/email/template/requestUserCredentials.handlebars"
          );

          return done(null, newCustomer);
        }

        return done(null, customer);
      } catch (err) {
        return done(err, null);
      }
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
