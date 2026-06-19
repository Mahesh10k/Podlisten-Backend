const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    // const admins = process.env.ADMIN_ARRAY.split(",");

    if (req.user.role === "user") {
      return res.status(200).json({ message: "You don't have access" });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

module.exports = authentication;
