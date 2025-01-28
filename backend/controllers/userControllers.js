import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

// user Registeration
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
      expiresIn: "1h",
    });
    
    res.status(200).json({ token });
   
  } catch (error) {
    res.status(500).json({ message: "catch error" });
  }
};
