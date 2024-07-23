import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",                   //we store user id in participants array
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",             //we store message id in message array
            default: [],    
        }
    ]
}, {timestamps: true})

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
