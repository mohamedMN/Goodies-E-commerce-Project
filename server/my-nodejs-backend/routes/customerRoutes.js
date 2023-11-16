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
const passport = require("passport");
const {
  CustomerResetPasswordController,
  CustomeResetPasswordRequestController,
} = require("../controllers/CustomerForgetPass");

//-----------------------------Customer API------------------------------
// Authentication of Customer
// Login with google

router.post("/login", loginCustomerController);

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
    // fih kolchi email,_id,first_name....
    // console.log("req.session ", req.session.passport.user);
    res
      .status(200)
      .json({
        status: "success",
        message: "Login successful!",
        email: req.session.passport.user.email,
      });
  }
);
// reset password
router.post("/PasswordRequest", CustomeResetPasswordRequestController);
router.post("/resetPassword", CustomerResetPasswordController);

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
