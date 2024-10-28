const express = require("express")
const connectDB = require('./Config/database')
const app = express();
const User = require("./Models/user");
const user = require("./Models/user");
const port = 3000;

app.use(express.json());
//signup api for signing the user
app.post("/signup", async (req, res) => {
    const data = req.body;
    const user = new User(data)

    try {
        await user.save();
        res.send("User added successfully")

    } catch (err) {
        res.status(400).send("Error in saving the user:" + err.message)
    }
})

//user API to find the single user by by email
app.get("/user", async (req, res) => {
    //getting user from body
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail })
        if (users.length === 0) {
            res.status(400).send("User not found")
        } else {

            // console.log(users)
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Feed API - get all the users form the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({})
        if (users.length === 0) {
            res.send("No user found")
        } else {
            console.log(users);
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }

})

// UserID API - get all users from ID
app.get("/userID", async (req, res) => {

    try {
        const users = await User.findById('671e144c0a3231e5a6fdd3e5')
        if (users.length === 0) {
            res.send("No user found")
        } else {
            // console.log(users);
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }

})

connectDB().then(() => {
    console.log("Database Connection Successfull")
    app.listen(port, () => {
        console.log("Server started running on port " + port)
    })
})
    .catch(() => {
        console.error("Database Connection Failed")
    })



