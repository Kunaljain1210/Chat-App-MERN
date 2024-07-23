import Conversation from "../model/conversation.model.js"
import Message from "../model/message.model.js"
import { getReciverSocketId, io } from "../socket/socket.js"; 

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id

        //find the conversation array where it include all these fields
        //find conversation between sender and reciver
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        //if conversation not exists then we create by ourself with both participants
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        //created new Message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        }) 
        //putting newMessage into conversation
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }


        //optimise code and this one will run parallely
        await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReciverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(201).json(newMessage);       //send it as a response

    } catch (error) {
        console.log("Error in sendMessage Controller", error.message);
        res.status(500).json({error: "Internal server messsage"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;      //get message from user side
        const senderId = req.user._id;              //comming from protectRoute from
        const conversation = await Conversation.findOne({
            participants: {$all : [senderId, userToChatId]},
        }).populate("messages");    //through populate we get real messages instead of messages array

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessage Controller", error.message);
        res.status(500).json({error: "Internal server messsage"})
    }
}