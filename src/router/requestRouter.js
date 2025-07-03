const express = require("express");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", (req, res) => {
  try {
    res.status(200).json({ message: "Request has been sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = requestRouter;
