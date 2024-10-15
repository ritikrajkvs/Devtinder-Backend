const express = require("express")
const app = express();
const port = 3000;

app.get("/user", (req, res) => {
    res.send("Get Request ")
})

app.post("/user", (req, res) => {
    res.send("POST request ")
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
