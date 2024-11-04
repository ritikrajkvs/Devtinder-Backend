//Authentication middlewares
const adminAuth = (req, res, next) => {
    const token = "999";
    const isAuthorizedAdmin = token === "999";
    console.log("Admin Authentication checking")
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin")
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "777";
    const isAuthorizedAdmin = token === "777";
    console.log("User Authentication checking")
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin")
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}