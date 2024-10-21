const express = require("express")
const app = express();
const port = 3000;

app.use(
    "/user",
    
    [(req, res, next) => {
        console.log("1st route Handler")
        next()
    },
    (req, res, next) => {
        console.log("2nd route Handler")
        // res.send("Second Response")
        next()
    },
    (req, res, next) => {
        console.log("3rd route Handler")
        // res.send("Third Response")
        next()
    },
    (req, res, next) => {
        console.log("4th route Handler")
        res.send("Fourth Response")

    }]
)

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
