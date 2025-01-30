import express from "express";
import {
  validateUserRegister,
  validateUserUpdate,
} from "../middleware/userRequestsMiddleware.js";
import {
  addFriend,
  deleteUser,
  getMyProfile,
  getProfileById,
  login,
  registerUser,
  removeFriend,
  update,
} from "../controllers/userControllers.js";
import { userUpdateSchema } from "../models/userRequestsSchema.js";
import { authenticatJWT } from "../middleware/auth.js";

const userRouter = express.Router();
userRouter.get("/profile", authenticatJWT, getMyProfile);
userRouter.get("/:id", authenticatJWT, getProfileById);
userRouter.post("/register", validateUserRegister, registerUser);
userRouter.post("/login", login);
userRouter.put("/profile", validateUserUpdate, update);
userRouter.post("/addfr", authenticatJWT, addFriend);
userRouter.patch("/remfr", authenticatJWT, removeFriend);
userRouter.delete("/:id", authenticatJWT, deleteUser);

export default userRouter;
