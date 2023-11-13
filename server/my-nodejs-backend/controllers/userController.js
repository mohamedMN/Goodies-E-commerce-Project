const User = require("../models/User");

const ListUserController = async (req, res) => {
  try {
    // console.log("req.session.passport " + req.session.user);
    const users = await User.find().select(
      "_id user_name last_name first_name role email"
    );
    // console.log("userss " + users);
    // res.status(200).json({ users, username });

    res.status(200).json({ users });
    // console.log(" role ! " + JSON.stringify(req));
  } catch (error) {
    res.status(500).json({ message: "error to get all users" });
  }
};
const getUserById = async (req, res) => {
  const userId = req.params["id"];
  // console.log('userId ' + userId)
  const user = await User.find({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ data: user });
};
const profileController = async (req, res) => {
  try {
    const id = req.session.user._id;
    const username = req.session.user.user_name;
    console.log("username :" + username);
    console.log("id :" + id);
    const user = await User.findById(id);
    const encodedImage = user.image.data.toString("base64");

    const USER =  {
      id: user._id,
      user_name: user.user_name,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
      image: {
        image: encodedImage,
      },
    };
    res.status(200).json(USER);
  } catch (error) {
    res.status(500).json({ message: "error in findById function" });
  }
};
const getUserByName = async (req, res) => {
  const query = req.query.query;
  const results = await User.findOne({ user_name: query });
  if (results.length === 0) {
    return res
      .status(404)
      .json({ message: "No users found with the provided query." });
  }
  res.status(200).json({ data: results });
};

const UpdateUser = async (req, res) => {
  const userId = req.params["id"];
  console.log("userId " + userId);
  const { firstName, lastName, email, userName } = req.body;
  console.log("Last Name:", lastName);
  console.log("First Name:", firstName);
  console.log("User Name:", userName);
  console.log("Email:", email);
  const updatedUserData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    user_name: userName,
  };
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "invalid user id" });
    }
    await User.updateOne({ _id: user._id }, { $set: updatedUserData });
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "the field xxx should be of type xxx" });
  }
};
const DeleteUser = async (req, res) => {
  const userId = req.params["id"];
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "invalid user id" });
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
};
module.exports = {
  ListUserController,
  getUserById,
  DeleteUser,
  UpdateUser,
  getUserByName,
  profileController,
};
