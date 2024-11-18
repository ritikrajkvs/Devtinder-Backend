const express = require("express")
const connectDB = require('./Config/database')
const app = express();
const User = require("./Models/user");
const port = 3000;
const validator = require("validator")
const { validateSignupData } = require("./utils/validation")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cookieParser());

//signup api for signing the user
app.post("/signup", async (req, res) => {
    try {
        //Validate the data
        validateSignupData(req)
        const { firstName, lastName, emailId, password, age, gender, about, skills } = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(passwordHash)

        const user = new User(
            {
                firstName,
                lastName,
                emailId,
                password: passwordHash,
                age,
                gender,
                about,
                skills
            }
        )
        await user.save();
        res.send("User added successfully")

    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid Email")
        }
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (isValidPassword) {
            //create a jwt token
            const token = await jwt.sign({ _id: user._id }, "999@Akshad")
            // console.log(token)

            //cookie
            res.cookie("token", token)
            res.send("User Loggedin Successfully")
        } else {
            throw new Error("Invalid Vredentials")
        }
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})

//profile API to get the profile details
app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Invalid Token")
        }

        //validate my token
        const decodedMessage = await jwt.verify(token, "999@Akshad");
        const { _id } = decodedMessage

        const user = await User.findById(_id);
        console.log(user)

        res.send(user)
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})

//user API to find the single user by by email
app.get("/user", async (req, res) => {
    //getting user from body
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail })
        if (users.length === 0) {
            res.status(400).send("User not found")
        } else {
            // console.log(users)
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Feed API - get all the users form the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({})
        if (users.length === 0) {
            res.send("No user found")
        } else {
            console.log(users);
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }

})

// UserID API - get all users from ID
app.get("/userID", async (req, res) => {

    try {
        const users = await User.findById('671e144c0a3231e5a6fdd3e5')
        if (users.length === 0) {
            res.send("No user found")
        } else {
            // console.log(users);
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }

})

//delete user API - deleting a user by its id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const users = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// patch user API - updating the data of user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "photoURL",
            "about",
            "gender",
            "skills",
            "firstName",
            "lastName",
            "age"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills can not be more than 10")
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "before",
            runValidators: true
        });
        console.log(user)
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message)

    }
})


//User update API with email id
app.patch("/userEmail", async (req, res) => {

    try {
        const user = await User.updateOne({ emailId: "mint@gmail.com" }, {
            firstName: "Mint found it",
            password: "Mint2002"
        });
        console.log(user)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send(err)
    }
})

//database connect before server 
connectDB().then(() => {
    console.log("Database Connection Successfull")
    app.listen(port, () => {
        console.log("Server started running on port " + port)
    })
})
    .catch(() => {
        console.error("Database Connection Failed")
    })



