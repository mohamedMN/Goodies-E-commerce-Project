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

//-----------------------------Customer API------------------------------
// Authentication of Customer
router.post("/login", loginCustomerController);
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3125/customers/api/account/google",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

router.get(
  "/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/error", (req, res) => res.send("Unknown Error"));
router.get(
  "/api/account/google",
  passport.authenticate("google", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/");
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
