const mongoose = require("mongoose");

//Connection request schema
const connectionRequest = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        requ
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "accepted", "rejected", "intrested"],
            message: `{VALUES} is incorrect status type`
        }
    }
},
    {
        timestamps: true
    }
);