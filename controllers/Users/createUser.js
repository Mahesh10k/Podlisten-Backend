const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, name, password, uid } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, name, uid, password: hashPassword });
    await user.save();
    res.status(201).json({ message: "user created", user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

module.exports = createUser;
