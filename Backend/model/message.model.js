import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
    //createdAt, updatedAt
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);
export default Message;


    // timestamps create two fields createdAt, updatedAt. These fields help track the time when a document is created and last updated, respectively.