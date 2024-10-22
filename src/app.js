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

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
