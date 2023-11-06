const express = require("express");
const router = express.Router();

const {
  authUser,
  generate_Public_Token,
  generate_Private_Token,
  verifyRefreshToken,
  verifyAccessToken,
} = require("./userRoutes");
const {
  checkUserRoleAdmin,
  checkUserRole,
} = require("../middleware/chequeRole");
const {
  login,
  registerUser,
  refresh,
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
const storage = multer.memoryStorage(); // Store the image data in memory as a buffer
const upload = multer({ storage });

// our API
//checkUserRoleAdmin
// taking the image on image folder
router.post(
  "/register",
  checkUserRoleAdmin,
  upload.single("image"),
  registerUser
);

router.post("/authentication", login);
//to get new access Token
router.post("/refresh", refresh);
//Only the users with admin and manager role can get the users data.  checkUserRole
router.get("/users", ListUserController);
//Only the users with admin and manager role can get the users data. checkUserRole
router.get("/users/:id", checkUserRole, getUserById);
// get profile informations
router.get("/profile", profileController);
//Only the users with admin and manager role can get ALL users. checkUserRole
// API : you can search for users whose user_name matches
// Exemple : GET /api/users?query=john_doe

router.get("/api/users", checkUserRole, getUserByName);

// Only the users with admin role can update the user's data. checkUserRoleAdmin
router.put("/users/:id", checkUserRoleAdmin, UpdateUser);
// Only the users with admin role can DELETE the user's. checkUserRoleAdmin
router.delete("/users/:id", checkUserRoleAdmin, DeleteUser);

module.exports = router;
