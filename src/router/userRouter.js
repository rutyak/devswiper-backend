const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const validationSignup = require("../utils/validationSignup");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const userAuth = require("../middleware/userAuth");

require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    //validation
    validationSignup(req);

    const { password } = req.body;

    //encryption
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: passwordHash });
    res.status(201).json({ message: "User successfully registered", newUser });
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials " });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = await jwt.sign(
      { id: user._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );
    res.cookie("jwtToken", token);
    res.status(200).json({ message: "Login successfull !!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res
      .status(200)
      .json({ message: "Profile info fetched successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "connection request successfully send!!!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, age, ...updatedData } = req.body;

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.status(202).json({ message: "updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
