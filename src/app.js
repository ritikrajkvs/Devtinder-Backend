const express = require("express")
const app = express();
const port = 3000;
const { adminAuth, userAuth } = require("./Middlewares/auth")

//Handle user authentication for all admin routes using middlewares
app.use("/admin", adminAuth)
app.get("/admin/getAllData", (req, res) => {
    res.send("All data Generated")
})

app.get("/admin/deleteData", (req, res) => {
    res.send("Data Deleted")
})

app.get("/user", userAuth, (req, res) => {
    res.send("User Data Sent")
})

app.get("/user/login", (req, res) => {
    res.send("User Logged in successfully (No auth required)")
})

app.get("/errorHandler", (req, res) => {
    throw new Error("Random Error you have to solve it");
    res.send("Error handling");
})

//error handling middleware
app.use("/", (err, req, res, next) => {
    if (err) {
        // console.log(err)
        res.status(500).send("Soemthing went wrong")
    }
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
