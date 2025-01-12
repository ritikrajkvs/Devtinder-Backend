const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");
const User = require("../Models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //toUser exist check
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }

      //Status Check
      const allowedStatuses = ["ignored", "intrested"];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status type:" + status);
      }

      //Existing user exist check
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log(existingConnectionRequest);
      if (existingConnectionRequest) {
        throw new Error("Already sent the connection request before");
      }

      //   //sending self request check
      //   if (fromUserId == toUserId) {
      //     return res.status(400).json({
      //       message: "You can't send request to your own",
      //       success: false,
      //     });
      //   }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.status(200).json({
        message: user.firstName + " is " + status + " in " + toUser.firstName,
        data,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params.status;

      //Validate Status
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status or Status not allowed",
          success: false,
        });
      }

      //validating the request
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"intrested"
      });
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  }
);

module.exports = requestRouter;
