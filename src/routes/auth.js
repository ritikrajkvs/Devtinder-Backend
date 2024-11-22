const express = require("express");
const authRouter = express.Router();
const User = require("../Models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { validateSignupData } = require("../utils/validation");

//signup api for signing the user
authRouter.post("/signup", async (req, res) => {
    try {
        //Validate the data
        validateSignupData(req);
        const {
            firstName,
            lastName,
            emailId,
            password,
            age,
            gender,
            about,
            skills,
        } = req.body;
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            about,
            skills,
        });
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid Email");
        }
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
            const token = await user.getjwt();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("User Loggedin Successfully");
        } else {
            throw new Error("Invalid Vredentials");
        }
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
});


module.exports = authRouter;