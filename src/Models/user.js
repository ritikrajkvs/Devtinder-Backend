const mongoose = require("mongoose");
const validator = require("validator")

// User Model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        minLength: 3,
        maxLenght: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: false,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email :" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter Strong password :" + value)
            }
        }

    },
    age: {
        type: Number,
        required: false,
        min: 18
    },
    gender: {
        type: String,
        required: false,
        trim: true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Not a valid gender (Male , Female and other)")
            }
        }
    },
    about: {
        type: String,
        default: "Dev is in search for someone here"
    },
    photoURL: {
        type: String,
        default: "https://www.freepik.com/free-photos-vectors/default-user",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL :" + value)
            }
        }
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
})

mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);