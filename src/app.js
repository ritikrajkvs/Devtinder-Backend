const express = require("express")
require('./Config/database')
const app = express();
const port = 3000;


app.listen(port, () => {
    console.log("Server started running on port " + port)
})
