const express = require("express");
const userRouter = express();
const User = require("../model/userSchema");

userRouter.get("/user", async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json({ message: "Fetched successfully!!", userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = userRouter;