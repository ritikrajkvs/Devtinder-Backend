const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLenght: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        required: true,
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
        default: "https://www.freepik.com/free-photos-vectors/default-user"
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
})

mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);