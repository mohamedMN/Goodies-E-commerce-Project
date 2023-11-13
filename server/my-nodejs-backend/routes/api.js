const express = require("express");
const router = express.Router();

const {
  checkUserRoleAdmin,
  checkUserRole,
} = require("../middleware/chequeRole");
const {
  login,
  registerUser,
  refresh,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/authController");
const {
  ListUserController,
  getUserById,
  DeleteUser,
  UpdateUser,
  getUserByName,
  profileController,
} = require("../controllers/userController");
const multer = require("multer");
const { logOut } = require("../controllers/passport-config");
const storage = multer.memoryStorage(); // Store the image data in memory as a buffer
const upload = multer({ storage });

// our API
//checkUserRoleAdmin
// taking the image on image folder    checkUserRoleAdmin
router.post(
  "/register",
  upload.single("image"),
  checkUserRoleAdmin,
  registerUser
);

router.post("/authentication", login);
router.post("/logout", logOut);
//to get new access Token
router.post("/refresh", refresh);
//Only the users with admin and manager role can get the users data.  checkUserRole
router.get("/users", ListUserController);
// get profile informations
router.get("/profile", profileController);
//Only the users with admin and manager role can get the users data. checkUserRole
router.get("/id/:id", checkUserRole, getUserById);
//Only the users with admin and manager role can get ALL users. checkUserRole
// API : you can search for users whose user_name matches
// Exemple : GET /api/users?query=john_doe
router.get("/api/users", checkUserRole, getUserByName);
// Forget Password Request
router.post("/PasswordRequest", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
// Only the users with admin role can update the user's data. checkUserRoleAdmin
router.post("/id/:id", checkUserRoleAdmin, UpdateUser);
// Only the users with admin role can DELETE the user's. checkUserRoleAdmin
router.delete("/:id", checkUserRoleAdmin, DeleteUser);

// router.get("loginCustomer", loginCustomerController);

module.exports = router;
