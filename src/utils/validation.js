const validator = require("validator")
const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter a vaid first or last name")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid Email ID")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password")
    }

}
module.exports = {
    validateSignupData
}