const express = require("express")
const app = express();
const port = 3000;

app.get("/user", (req, res) => {
    res.send("GET Request ")
})

app.post("/user", (req, res) => {
    res.send("POST Request ")
})

app.put("/user", (req, res) => {
    res.send("PUT Request")
})

app.delete("/user", (req, res) => {
    res.send("Delete Request")
})

app.patch("/user", (req, res) => {
    res.send("PATCH Request")
})
//advance routing
app.patch("/user+c", (req, res) => {
    res.send("PATCH Request")
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
