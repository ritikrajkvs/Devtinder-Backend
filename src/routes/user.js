const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");

//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    if (connectionRequests) {
      return res.status(200).json({
        connectionRequests,
      });
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = userRouter;
