const usersModel = require("../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const totalUsers = await usersModel.find();
    if (!totalUsers.length)
      return res.status(404).json({ message: "Users not found" });
    return res.status(200).json(totalUsers);;
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = getUsers;