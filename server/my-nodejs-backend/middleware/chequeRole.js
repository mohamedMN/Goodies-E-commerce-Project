const checkUserRole = (req, res, next) => {
  const userRole = req.session.user.role;

  if (userRole === "Admin" || userRole === "Manager") {
    next();
  } else {
    res.status(403).json({
      message: "Role privilege limitation",
    });
  }
};
// only ADMIN account can use this route
const checkUserRoleAdmin = (req, res, next) => {
  const userRole = req.session.user.role;
  console.log("role " + userRole);
  if (req.session.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "you don't have enough privilege .",
    });
  }
};
module.exports = { checkUserRoleAdmin, checkUserRole };
