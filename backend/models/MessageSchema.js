import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ",
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uder",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    attachments: [
      {
        filename: { type: String, required: true },
        url: { type: String, required: true },
        mimeType: { type: String, required: true },
      },
    ],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // For threading
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
