const Customer = require("../models/Customer");

// Add Customer
const Add_Customer_Controller = async (req, res) => {
  try {
    // Extract customer data from the request body
    const { username /* other properties */ } = req.body;

    // Create a new customer instance
    const newCustomer = new Customer({
      username,
      // set other properties based on req.body
    });

    // Save the new customer to the database
    await newCustomer.save();

    // Send a response indicating success
    res
      .status(201)
      .json({ message: "Customer added successfully", data: newCustomer });
  } catch (error) {
    // Handle errors, e.g., validation errors or database errors
    res
      .status(500)
      .json({ message: "Error adding customer", error: error.message });
  }
};

// Get All Customers
const Get_All_Customer_Controller = async (req, res) => {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find();

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
    const { username } = req.params;

    // Find a customer by username in the database
    const customer = await Customer.findOne({ username });

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
    const { id } = req.params;

    // Find a customer by ID in the database
    const customer = await Customer.findById(id);

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

// Validate Customer
const Validate_Customer_Controller = async (req, res) => {
  try {
    const { id } = req.params;

    // Find a customer by ID in the database
    const customer = await Customer.findById(id);

    if (customer) {
      // Assuming there's a 'validated' property in the customer schema
      customer.validated = true;

      // Save the updated customer to the database
      await customer.save();

      res
        .status(200)
        .json({ message: "Customer validated successfully", data: customer });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating customer", error: error.message });
  }
};

// Update Customer Data
const Update_Customer_data_Controller = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      /* updated properties */
    } = req.body;

    // Find a customer by ID in the database
    const customer = await Customer.findById(id);

    if (customer) {
      // Update properties based on req.body
      // Example: customer.name = req.body.name;

      // Save the updated customer to the database
      await customer.save();

      res.status(200).json({
        message: "Customer data updated successfully",
        data: customer,
      });
    } else {
      res.status(404).json({ message: "Customer not found" });
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
    const { id } = req.params;

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
    const { id } = req.params;

    // Find a customer by ID in the database and return profile information
    const customer = await Customer.findById(id);

    if (customer) {
      // Assuming there's a 'profile' property in the customer schema
      res.status(200).json({ data: customer.profile });
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
    const { id } = req.params;
    const {
      /* updated profile properties */
    } = req.body;

    // Find a customer by ID in the database
    const customer = await Customer.findById(id);

    if (customer) {
      // Update profile properties based on req.body
      // Example: customer.profile = req.body.profile;

      // Save the updated customer to the database
      await customer.save();

      res
        .status(200)
        .json({
          message: "Customer profile updated successfully",
          data: customer,
        });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
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
  Validate_Customer_Controller,
  Update_Customer_data_Controller,
  Delete_Customer_Controller,
  get_Customer_Profile_Controller,
  Update_Customer_Profile_Controller,
};
