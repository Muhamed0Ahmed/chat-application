import express from "express";
import { deleteSpecMess, getConversition, getMessagesById, getSpecMessage, MarkSpecMessage, sendMessageController, unReadMessages, updateMessage, uploadAttach } from "../controllers/messageControllers.js";
import { authenticatJWT } from "../middleware/auth.js";
import { messageSendRequestMiddleware } from "../middleware/validateMessageRequests.js";

const messageRouter = express.Router();

//send a new message
messageRouter.post("/",authenticatJWT, messageSendRequestMiddleware, sendMessageController);

//get messages for a specific user
messageRouter.get("/:userId", getMessagesById);

//get conversition
messageRouter.get("/:userId1/:userId2", getConversition)

//get a specific message
messageRouter.get("/:messageId", getSpecMessage)

//update message
messageRouter.put("/:messageId", updateMessage)

//delete a specific message
messageRouter.delete("/:messageId", deleteSpecMess)

//Mark a message as read 
messageRouter.post("/read/:messageId", MarkSpecMessage)

//retrieve un read messages for a specific user
messageRouter.get("/unread/:userId", unReadMessages)

//upload attachments
messageRouter.post("/attachments",uploadAttach);


export default messageRouter;
