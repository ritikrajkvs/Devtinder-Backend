const mongoose = require("mongoose");
const databaseURL = "mongodb+srv://akshadsantoshjaiswal:rFw7NSxncTpSc7Bq@cluster0.yulixmn.mongodb.net/devTinder?"

const connectDB = async () => {
    await mongoose.connect(databaseURL)
}
module.exports = connectDB;




