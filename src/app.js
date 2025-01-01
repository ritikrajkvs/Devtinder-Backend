const express = require("express");
const connectDB = require("./Config/database");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//database connect before server
connectDB()
  .then(() => {
    console.log("Database Connection Successfull");
    app.listen(port, () => {
      console.log("Server started running on port " + port);
    });
  })
  .catch(() => {
    console.error("Database Connection Failed");
  });
