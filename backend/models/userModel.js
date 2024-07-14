const mongoose = require("mongoose")

const tockenSchema = new mongoose.Schema({
    kind:String,
    accessToken:String
})
const profileSchema = new mongoose.Schema({
    name:String,
    gender:String,
    website:String,
    location:String,
    picture:String
})
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        trim:true
    }, 
    email:{
        type:String,
        required:true, 
        unique:true,
        trim:true, 
        lowercase:true
    }, 
    password:{
        type:String,
        required:true,

    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date
    },
    github:{

    },
    google:{

    },
    tokens:[tockenSchema],
    profile:profileSchema,
    createdAt:{
        type:Date
    },
    udpatedAt:{
        type:Date
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
