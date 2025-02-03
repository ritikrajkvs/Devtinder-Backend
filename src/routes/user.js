const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoURL about age gender";

//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (connectionRequests) {
      return res.status(200).json({
        connectionRequests,
      });
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser)
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", USER_SAFE_DATA);

    // console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    //You should see all the user cards except
    //1 his own card
    //2 His own connections
    //3 Ingored people
    //4 already ent the connection request

    const loggedInUser = req.user;
    console.log(loggedInUser)
    //find all the connection request either i have send or recieved
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });
    res.send(connectionRequest);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
module.exports = userRouter;
