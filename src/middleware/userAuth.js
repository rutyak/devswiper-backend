const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  console.log("hitting auth middleware");
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      res.status(404).json({ message: "User is not authenticated" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id } = decoded;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User is not authenticated" });
    }
    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = userAuth;
