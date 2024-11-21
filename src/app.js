const express = require("express");
const connectDB = require("./Config/database");
const app = express();
const User = require("./Models/user");
const port = 3000;
const validator = require("validator");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./Middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//signup api for signing the user
app.post("/signup", async (req, res) => {
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

        // console.log(passwordHash)

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

app.post("/login", async (req, res) => {
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

//profile API to get the profile details
app.get("/profile", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user);
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending connection request");
    res.send(user.firstName + " sent the connection request");
});

//database connect before server
connectDB()
    .then(() => {
        console.log("Database Connection Successfull");
        app.listen(port, () => {
            console.log("Server started running on port " + port);
        });
    })
    .catch(() => {
        console.error("Database Connection Failed");
    });
