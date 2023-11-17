const Customer = require("../models/Customer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/TokenCustomer");
const sendEmail = require("../utils/sendEmail");

require("dotenv").config();
bcryptSalt = process.env.BCRYPT_SALT;
clientURL = process.env.CLIENT_URL_CUSTOMER;

const CustomeRequestPasswordReset = async (email) => {
  // console.log("clientURL " + clientURL);
  console.log("email " + email);
  const customer = await Customer.findOne({ email });

  if (!customer) throw new Error("User does not exist");
  console.log("customer._id " + customer._id);

  let token = await Token.findOne({ userId: customer._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  await new Token({
    userId: customer._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}?token=${resetToken}&id=${customer._id}`;
  sendEmail(
    customer.email,
    "Password Reset Request",
    { name: customer.first_name + " " + customer.last_name, link: link },
    "../utils/email/template/requestResetPassword.handlebars"
  );
  return link;
};
const CustomeResetPasswordRequestController = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("email " + JSON.stringify(req.body));
    const customer = await Customer.findOne({ email });
    if (customer) {
      const requestPasswordResetService = await CustomeRequestPasswordReset(
        email
      );
      return res.status(200).json(requestPasswordResetService);
    } else {
      console.log("no user with that email ! ");
      return res.status(400).json({ message: " no user with that email ! " });
    }
  } catch (error) {
    console.log(error);
  }
};
const CustomerResetPasswordController = async (req, res) => {
  console.log(`
  userId: ${req.body.userId},
  token: ${req.body.token},
  password: ${req.body.password} 
`);
  const resetPasswordService = await CustomerResetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  if (resetPasswordService) {
    return res.status(200).json({ message: " password has reset succes" });
  } else {
    return res.status(400).json({ error: "Password reset failed" });
  }
};
const CustomerResetPassword = async (userId, token, password) => {
  try {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await Customer.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );

    const user = await Customer.findOne({ _id: userId });

    await sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.first_name + " " + user.last_name,
      },
      "../utils/email/template/resetPassword.handlebars"
    );

    await passwordResetToken.deleteOne();

    return user;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Password reset failed"); // You can customize the error message as needed
  }
};

module.exports = {
  CustomeRequestPasswordReset,
  CustomeResetPasswordRequestController,
  CustomerResetPasswordController,
  CustomerResetPassword,
};
