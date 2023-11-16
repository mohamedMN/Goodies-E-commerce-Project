const express = require("express");
const { loginCustomerController } = require("../controllers/authController");
const {
  Add_Customer_Controller,
  Get_All_Customer_Controller,
  Get_Customer_UserName_Controller,
  Get_Customer_id_Controller,
  Validate_Customer_Controller,
  Update_Customer_data_Controller,
  Delete_Customer_Controller,
  get_Customer_Profile_Controller,
  Update_Customer_Profile_Controller,
  Activate_Customer_Controller,
} = require("../controllers/customerController");
const { googleAuth, CallBackGoogle } = require("../controllers/Oauth");
const router = express.Router();
const Customer = require("../models/Customer");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID

//-----------------------------Customer API------------------------------
// Authentication of Customer
router.post("/login", loginCustomerController);
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  "google",
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
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
          const newCustomer = await Customer.create({
            _id: uniqueId,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: "",
          });
          await newCustomer.save();
          return done(null, newCustomer);
        }
        return done(null, customer);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

router.get(
  "/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/error", (req, res) =>
  res.status(504).json({ status: "failed", message: "Login failed!" })
);
router.get(
  "/api/account/google",
  passport.authenticate("google", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.status(200).json({ status: "success", message: "Login successful!" });
  }
);
router.get("/", (req, res) => res.send(`Welcome !`));

// Login with google
// router.get("/auth/google", googleAuth);
// router.get("/auth/google/callback", CallBackGoogle);

// Add Customer
router.post("/customers", Add_Customer_Controller);

// activate account by email
router.post("/confirm/:token", Activate_Customer_Controller);

// Get All Customers
router.get("/customers", Get_All_Customer_Controller);

// Get Customer by Username
router.get("/username", Get_Customer_UserName_Controller);

// Get Customer by ID
router.get("/:id", Get_Customer_id_Controller);

// Validate Customer
router.put("/:id", Validate_Customer_Controller);

// Update Customer Data
router.put("/data/:id", Update_Customer_data_Controller);

// Delete Customer
router.delete("/:id", Delete_Customer_Controller);

// Get Customer Profile by ID
router.get("/profile/:id", get_Customer_Profile_Controller);

// Update Customer Profile by ID
router.put("/profile/:id", Update_Customer_Profile_Controller);

module.exports = router;
