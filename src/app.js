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
        const users = await User.findOne({ emailId: userEmail })
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

//delete user API - deleting a user by its id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const users = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// patch user API - updating the data of user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "before",
            runValidators: true
        });
        console.log(user)
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send(err)

    }
})


//User update API with email id
app.patch("/userEmail", async (req, res) => {

    try {
        const user = await User.updateOne({ emailId: "mint@gmail.com" }, {
            firstName: "Mint found it",
            password: "Mint2002"
        });
        console.log(user)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send(err)
    }
})

//database connect before server 
connectDB().then(() => {
    console.log("Database Connection Successfull")
    app.listen(port, () => {
        console.log("Server started running on port " + port)
    })
})
    .catch(() => {
        console.error("Database Connection Failed")
    })



