const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv")

// const User = require("./models/userModel")
// const Room = require("./models/roomsModel")

const PORT = 5000
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODBURI2).then(() => console.log("MongoDB connected")).catch( err => console.log(err))

// const newUser = new User({
//     username: 'johndoe',
//     email: 'johndoe@example.com',
//     password: 'securepassword123'
// });

// newUser.save()
//     .then(user => {
//         console.log('User created:', user);
        
//         // Create a new room with the user as the owner
//         const newRoom = new Room({
//             title: 'Example Room',
//             slug: 'example-room',
//             description: 'This is an example room.',
//             owner: user._id,
//             isPrivate: false,
//             members: [user._id]
//         });

//         return newRoom.save();
//     })
//     .then(room => {
//         console.log('Room created:', room);

//         // Find the room and populate the owner field
//         return Room.findOne({ slug: 'example-room' }).populate('owner').exec();
//     })
//     .then(room => {
//         console.log('Room with populated owner:', room);
//     })
//     .catch(err => console.log('Error:', err));

app.get("/",(req, res) => {
    console.log("hello world" )
} )

app.listen(PORT,() => console.log("Hello World "))