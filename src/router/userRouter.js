const express = require("express");
const userRouter = express();
const User = require("../model/userSchema");
const userAuth = require("../middleware/userAuth");
const { populate } = require("../model/connectionRequest");
const ConnectionRequest = require("../model/connectionRequest");

const USER_INFO = "firstname lastname age gender skills";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser_id = req.user._id;
    console.log("loggedInUser_id: ", loggedInUser_id);

    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser_id,
      status: "interested",
    }).populate("fromUserId", USER_INFO);

    res.status(200).json({ message: "Fetched successfully!!", requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    let loggedInUser_id = req.user._id;

    let connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser_id, status: "accepted" },
        { toUserId: loggedInUser_id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_INFO)
      .populate("toUserId", USER_INFO);

    console.log("connections: ", connections);

    let data = connections.map((data) => {
      if (data.fromUserId._id.equals(loggedInUser_id)) {
        return data.toUserId;
      }
      return data.fromUserId;
    });

    res.status(200).json({ message: "Connections fetched successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.get("/user/feeds", userAuth, async (req, res) => {
  try {
    let loggedInUser_id = req.user._id;

    //form user
    let feeds = await User.find({ _id: { $ne: loggedInUser_id } });

    //from connection
    let connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser_id }, { toUserId: loggedInUser_id }],
    });

    //ids array
    let connectionIds = new Set();
    connections.forEach((connection) => {
      connectionIds.add(connection.fromUserId.toString());
      connectionIds.add(connection.toUserId.toString());
    });

    //filtering feeds
    let feedData = feeds.filter(
      (feed) => !connectionIds.has(feed._id.toString())
    );

    res.status(200).json({ message: "feeds fetched successfully", feedData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = userRouter;
