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
const router = express.Router();

//-----------------------------Customer API------------------------------
// Authentication of Customer
router.post("/login", loginCustomerController);

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
