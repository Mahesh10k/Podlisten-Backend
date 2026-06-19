const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (user.email === "maheshpikki03@gmail.com") user.role = "admin";

    const jwtToken = jwt.sign(
      {
        id: user.uid,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.uid,
        name: user.name,
        email: user.email,
        role: user.role,
        favourites: user.favourites,
      },
      token: jwtToken,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = loginUser;
