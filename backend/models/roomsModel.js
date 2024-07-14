const mongoose = require("mongoose");


const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
        unique:true

    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        describe: "_id of the room owner user"

    },
    isPrivate:String,
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    updateAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//pre-save hook to updatedAt the updatedAt field on each save
RoomSchema.pre("save", function(next){
    this.updateAt = Date.now();
    next();
})

// compile the schema into a model
const Room = mongoose.model("Room", RoomSchema)

module.exports = Room;