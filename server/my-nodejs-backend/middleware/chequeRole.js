const checkUserRole = (req, res, next) => {
  console.log("role " + req.session.user.role);

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
  console.log("role " + req.session.user.role);
  const userRole = req.session.user.role;
  if (req.session.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "you don't have enough privilege .",
    });
  }
};
module.exports = { checkUserRoleAdmin, checkUserRole };
