const mongoose = require("mongoose");


const chatSchema = mongoose.Schema({
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    github:String,
    firstMessageAt:Date,
    lastMessageAt:Date,
    updatedAt:{
        type:Date
    },
    createdAt:Date
})

chatSchema.pre("save", function(next){
    this.updateAt = Date.now();
    next();
})


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

