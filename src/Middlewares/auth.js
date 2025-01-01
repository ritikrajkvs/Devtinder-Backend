const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Not a Vaid token !!");
    }

    const deocodedObj = await jwt.verify(token, "999@Akshad");
    const { _id } = deocodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
