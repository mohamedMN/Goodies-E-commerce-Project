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
} = require("../middleware/authMiddleware");
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
} = require("../controllers/userController");
// our API
//checkUserRoleAdmin
router.post("/register", registerUser);

router.post("/authentication", login);
//to get new access Token
router.post("/refresh", refresh);
//Only the users with admin and manager role can get the users data.  checkUserRole
router.get("/users", ListUserController);
//Only the users with admin and manager role can get the users data. checkUserRole
router.get("/users/:id", checkUserRole, getUserById);
//Only the users with admin and manager role can get ALL users. checkUserRole
// API : you can search for users whose user_name matches
// Exemple : GET /api/users?query=john_doe

router.get("/api/users", checkUserRole, getUserByName);

// Only the users with admin role can update the user's data. checkUserRoleAdmin
router.put("/users/:id", checkUserRoleAdmin, UpdateUser);
// Only the users with admin role can DELETE the user's. checkUserRoleAdmin
router.delete("/users/:id", checkUserRoleAdmin, DeleteUser);

module.exports = router;
