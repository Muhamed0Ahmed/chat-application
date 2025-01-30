import Message from "../models/MessageSchema.js";
import { Server } from "socket.io";

const io = new Server();

//Add new message
//POST api/messages/
export const sendMessageController = async (req, res) => {
  const { receiverId, content, type, attachments, replyTo } = req.body;
  const senderId = req.user.id;

  try {
    const message = new Message({
      sender: senderId,
      reciever: receiverId,
      content,
      type,
      attachments,
      replyTo,
    });
    console.log(message)
    await message.save();
    io.to(receiverId).emit("message", message);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Retrieve messages for a specific user
// GET /api/messages/:userId
export const getMessagesById  =(req, res) => {
  res.send("retrieve message for a specific user")
}


//Retrieve the conversition betwwen two users
//GET /api/messages/:userId1/:userId2

export const getConversition = (req, res) => {
  res.send("get conversition")
}

//Retrieve a specific message
//GET api/messages/:messageId
export const getSpecMessage = (req, res) => {
  res.send("get a specific message")
}

//update a message
//PUT /api/message/:messageId
export const updateMessage = (req, res) => {
  res.send("update a specific message")
}

//delete a message
//DELETE /api/messages/:messageId
export const deleteSpecMess  = (req, res) => {
  res.send("delete a specific message")
}


//Mark a message as read
//POST /api/message/read/:messageId
export const MarkSpecMessage = (req, res) => {
  res.send("Mark a specific message")
}

//retrieve unread message for a specific user
// GET /api/messages/unread/userId
export const unReadMessages = (req, res) => {
  res.send("get unRead messages")
}

//upload attachments.
//POST /api/messages/attachments
export const uploadAttach = (req, res) => {
  res.send("get a specific message")
}
