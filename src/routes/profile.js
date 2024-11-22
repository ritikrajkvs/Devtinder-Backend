const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");


//profile API to get the profile details
profileRouter.get("/profile", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user);
});

module.exports = profileRouter;