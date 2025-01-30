import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// const friendSchema = new mongoose.Schema({
//   id:{type:String, required:true},
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   status:{type:String, required:true},
//   profilePicture:{type:String, required:true},

// });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "default_profile_picture.png", // URL or path to the default profile picture
  },
  status: {
    type: String,
    default: "Hey there! I am using this app.", // Default status message
  },
  lastSeen: {
    type: Date,
    default: Date.now, // To track when the user was last active
  },
  isOnline: {
    type: Boolean,
    default: false, // To track if the user is currently online
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ", // Reference to other users (for friend lists)
    },
  ],
  // friends:[friendSchema],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ", // Reference to users that the current user has blocked
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the user was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the user was last updated
  },
});

// //hash password before saving the user
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Middleware to update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// // Method to compare password
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);
export default User;
