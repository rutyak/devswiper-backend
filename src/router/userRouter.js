const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // const { email } = req.body;

    // console.log("email: ", email);

    // let user = await User.find({ email });
    // if (user) {
    //   return res.status(404).json({ message: "User already registered" });
    // }
    console.log("signup api hitting...");

    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User successfully registered", newUser });
  } catch (error) {
    console.error("Internal server error");
    res.status(500).json({ message: error.message });
  }
});

router.get("/user", async (req, res) => {
  console.log("get user is hitting.....");
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
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
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
