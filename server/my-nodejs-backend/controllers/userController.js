const User = require("../models/User");

const ListUserController = async (req, res) => {
  try {
    // console.log("req.session.passport " + req.session.user);
    const users = await User.find().select(
      "_id user_name first_name role email"
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
  // console.log('userId ' + userId)
  const updatedUserData = req.body;
  // console.log('updatedUserData ' + updatedUserData)
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
};
