const express = require("express")
const connectDB = require('./Config/database')
const app = express();
const User = require("./Models/user")
const port = 3000;

app.post("/signup", async (req, res) => {

    const user = new User({
        firstName: "Aaradhana",
        lastName: "Tank",
        emailId: "aaradhana@gmail.com",
        password: "678910",
        // _id: "18948665644849"
    })

    try {
        await user.save();
        res.send("User added successfully")

    } catch (err) {
        res.status(400).send("Error in saving the user:" + err.message)
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



