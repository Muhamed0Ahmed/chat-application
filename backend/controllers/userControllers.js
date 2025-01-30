import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { Query } from "mongoose";

// get my profile
export const getMyProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User in not found" });
    }
    const {
      id,
      username,
      email,
      status,
      profilePicture,
      friends,
      blockedUsers,
      isOnline,
      updatedAt,
      lastSeen,
      createdAt,
    } = user;
    const userObj = {
      id,
      username,
      email,
      status,
      profilePicture,
      friends,
      blockedUsers,
      isOnline,
      updatedAt,
      lastSeen,
      createdAt,
    };
    res.status(200).json(userObj);
  } catch (error) {
    res.status(400).json({
      error: "User registration failed",
    });
  }
};

export const getProfileById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User  not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// register New User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({
      message: "user registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "User registration failed",
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid Email" });
    }
    // const passwordHash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "catch error" });
  }
};

export const update = async (req, res) => {
  const { username, email, status, profilePicture } = req.body;
  const token = req.headers.authorization?.split(" ")[0];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    const userId = decoded.id;

    const userUpdate = await User.findByIdAndUpdate(userId, {
      username,
      email,
      status,
      profilePicture,
      updatedAt: Date.now(),
    });
    if (!userUpdate) {
      return res.status(404).json({ message: "User  not found" });
    }

    await userUpdate.save();
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: userUpdate });
  } catch (error) {
    res.json({ error: error });
  }
  // res.send(`update is working! ${userId} `);
};
// Add a friend
export const addFriend = async (req, res) => {
  const { friendId } = req.body; // Expecting userId and friendId in the request body
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user) return res.status(404).json({ message: "User  not found" });

    // Add friend if not already in the list
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();

      friend.friends.push(userId);
      await friend.save();
      return res
        .status(200)
        .json({ message: "Friend added successfully", friends: user.friends });
    } else {
      return res.status(400).json({ message: "User  is already a friend" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a friend
export const removeFriend = async (req, res) => {
  const { friendId } = req.body; // Expecting userId and friendId in the request body
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User  not found" });

    // Remove friend if in the list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id.toString() !== friendId);
      await user.save();
      const friend = await User.findById(friendId);
      console.log(friend);
      friend.friends = friend.friends.filter((id) => id.toString() !== userId);
      console.log(friend);
      await friend.save();
      return res.status(200).json({
        message: "Friend removed successfully",
        friends: user.friends,
      });
    } else {
      return res.status(400).json({ message: "User  is not a friend" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser  = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User  not found' });
      res.status(200).json({ message: 'User  deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// // Block a user
// export const blockUser  = async (req, res) => {
//   const { userId, blockedUser_Id } = req.body; // Expecting userId and blockedUser Id in the request body
//   try {
//       const user = await User.findById(userId);
//       if (!user) return res.status(404).json({ message: 'User  not found' });

//       // Add to blocked users if not already in the list
//       if (!user.blockedUsers.includes(blockedUser Id)) {
//           user.blockedUsers.push(blockedUser Id);
//           await user.save();
//           return res.status(200).json({ message: 'User  blocked successfully', blockedUsers: user.blockedUsers });
//       } else {
//           return res.status(400).json({ message: 'error'}
