const express = require("express");
const connectDB = require("./src/Config/database");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config({});

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//database connect before server
connectDB().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server running on `+ port)
        })
    } catch (error) {
        console.log(error)
    }
})
