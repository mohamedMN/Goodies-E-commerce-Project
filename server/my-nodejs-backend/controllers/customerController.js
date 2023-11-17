const Customer = require("../models/Customer");
const { register_Customer } = require("./passport-config");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();
bcryptSalt = process.env.BCRYPT_SALT;
CLIENT_URL_ACTIVATE = process.env.CLIENT_URL_ACTIVATE;

// Add Customer
const Add_Customer_Controller = async (req, res) => {
  // Extract customer data from the request body
  const { firstName, lastName, email, password } = req.body;

  let SaltToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(SaltToken, Number(bcryptSalt));
  // Create a new customer instance
  const newCustomer = await register_Customer(
    firstName,
    lastName,
    email,
    password,
    hash
  );

  if (newCustomer) {
    res.status(201).json({
      message:
        "Customer created successfully,Check your Email to activate your account !.",
      data: newCustomer,
    });
    const link = `${CLIENT_URL_ACTIVATE}?token=${hash}`;
    sendEmail(
      newCustomer.email,
      "Activate Account ",
      {
        name: newCustomer.first_name + " " + newCustomer.last_name,
        link: link,
      },
      "../utils/email/template/requestActivateAccount.handlebars"
    );
    return link;
  } else {
    res.status(500).json({ message: "Customer failed" });
  }
};

const Activate_Customer_Controller = async (req, res) => {
  // const userId = req.params["id"];

  const token = req.params.token;
  // console.log("token :", req.params.token);
  console.log("token : ", token);
  try {
    const customer = await Customer.findOne({ token: token });
    console.log(" customer email : " + customer.email);
    if (!customer) {
      res.status(400).json({ message: "Customer not found" });
    }
    // the code should be 1 day expiration
    const expiresIn = 1000 * 60 * 60 * 60 * 24;

    if (Date.now() - customer.expires > expiresIn) {
      await Customer.deleteOne({ _id: customer._id });
      res.status(500).json({ message: "It expired, register a new account" });
    }
    customer.valid_account = true;
    await customer.save();
    req.session.customer = customer;
    return res.status(200).json({ message: " Account is Active " });
  } catch (error) {}
};

// Get All Customers
const Get_All_Customer_Controller = async (req, res) => {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find().select(
      "_id last_name first_name  email last_login createdAt valid_account active"
    );

    res.status(200).json({ data: customers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving customers", error: error.message });
  }
};

// Get Customer by Username
const Get_Customer_UserName_Controller = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const customer = await Customer.find({
      $or: [{ first_name: firstName }, { last_name: lastName }],
    });

    if (customer) {
      res.status(200).json({ data: customer });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving customer", error: error.message });
  }
};

// Get Customer by ID
const Get_Customer_id_Controller = async (req, res) => {
  try {
    const id = req.params["id"];
    // console.log("id ", id);

    // Find a customer by ID in the database
    const customer = await Customer.findOne({ _id: id });
    console.log("customer ", customer);
    if (customer) {
      res.status(200).json({ data: customer });
    } else {
      res.status(404).json({ message: "Customer not found with that ID" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving customer", error: error.message });
  }
};

// Validate Customer
// const Validate_Customer_Controller = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find a customer by ID in the database
//     const customer = await Customer.findById(id);

//     if (customer) {
//       // Assuming there's a 'validated' property in the customer schema
//       customer.validated = true;

//       // Save the updated customer to the database
//       await customer.save();

//       res
//         .status(200)
//         .json({ message: "Customer validated successfully", data: customer });
//     } else {
//       res.status(404).json({ message: "Customer not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error validating customer", error: error.message });
//   }
// };

// Update Customer Data
const Update_Customer_data_Controller = async (req, res) => {
  try {
    const id = req.params["id"];
    const { firstName, lastName, email, active } = req.body;
    console.log("id:", id);
    console.log("Last Name:", lastName);
    console.log("First Name:", firstName);
    console.log("active:", active);
    console.log("Email:", email);
    // Find a customer by ID in the database
    const customer = await Customer.findOne({ _id: id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedUserData = {};

    if (firstName !== undefined) {
      updatedUserData.first_name = firstName;
    }

    if (lastName !== undefined) {
      updatedUserData.last_name = lastName;
    }

    if (email !== undefined) {
      updatedUserData.email = email;
    }

    if (active !== undefined) {
      updatedUserData.active = active;
    }
    if (Object.keys(updatedUserData).length > 0) {
      // Update properties based on req.body
      await Customer.updateOne({ _id: id }, { $set: updatedUserData });
      res.status(200).json({ message: "Customer updated successfully" });
    } else {
      res.status(400).json({ message: "No data to update" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer data", error: error.message });
  }
};

// Delete Customer
const Delete_Customer_Controller = async (req, res) => {
  try {
    const id = req.params["id"];

    // Find and remove the customer by ID from the database
    const deletedCustomer = await Customer.findByIdAndRemove(id);

    if (deletedCustomer) {
      res.status(200).json({
        message: "Customer deleted successfully",
        data: deletedCustomer,
      });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer", error: error.message });
  }
};

// Get Customer Profile by ID
const get_Customer_Profile_Controller = async (req, res) => {
  try {
    const id = req.params["id"];
    // console.log("id ", id);
    // Find a customer by ID in the database and return profile information
    const customer = await Customer.find({ _id: id }).select(
      "_id last_name first_name  email last_login createdAt valid_account active"
    );

    // console.log("customer ",customer)
    if (customer) {
      // Assuming there's a 'profile' property in the customer schema
      res.status(200).json({ data: customer });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving customer profile",
      error: error.message,
    });
  }
};
const Update_Customer_Profile_Controller = async (req, res) => {
  try {
    const id = req.params["id"];
    const { firstName, lastName, email } = req.body;

    console.log("id:", id);
    console.log("Last Name:", lastName);
    console.log("First Name:", firstName);
    console.log("Email:", email);
    // Find a customer by ID in the database
    const customer = await Customer.findOne({ _id: id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedUserData = {};

    if (firstName !== undefined) {
      updatedUserData.first_name = firstName;
    }

    if (lastName !== undefined) {
      updatedUserData.last_name = lastName;
    }

    if (email !== undefined) {
      updatedUserData.email = email;
    }

    if (Object.keys(updatedUserData).length > 0) {
      // Update properties based on req.body
      await Customer.updateOne({ _id: id }, { $set: updatedUserData });
      res.status(200).json({ message: "Customer updated successfully" });
    } else {
      res.status(403).json({ message: "No data to update" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating customer profile",
      error: error.message,
    });
  }
};

module.exports = {
  Add_Customer_Controller,
  Get_All_Customer_Controller,
  Get_Customer_UserName_Controller,
  Get_Customer_id_Controller,
  // Validate_Customer_Controller,
  Update_Customer_data_Controller,
  Delete_Customer_Controller,
  get_Customer_Profile_Controller,
  Update_Customer_Profile_Controller,
  Activate_Customer_Controller,
};
