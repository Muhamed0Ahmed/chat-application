import mongoose from "mongoose";

const messageSchema =new mongoose.schema({
    sender:{
        type:mongoose.schema.Types.ObjectId,
        ref:"User ",
        required:true

    },
    content:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);
export default Message