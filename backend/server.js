import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import apiRoutes from "./routes/usersRouter.js";

//config dotenv
dotenv.config();

// Intialize express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// // MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Chat App API');
// });

// Define All Route uses
app.use("/api/users", apiRoutes);

// // Socket.io setup
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Broadcast the message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
