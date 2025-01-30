import express from "express";
import {
  validateUserRegister,
  validateUserUpdate,
} from "../middleware/vlidateRegister.js";
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
import { userUpdateSchema } from "../models/validationSchema.js";
import { authenticatJWT } from "../middleware/auth.js";

const router = express.Router();
router.get("/profile",authenticatJWT, getMyProfile);
router.get("/:id",authenticatJWT ,getProfileById);
router.post("/register", validateUserRegister, registerUser);
router.post("/login", login);
router.put("/profile", validateUserUpdate, update);
// router.get("/profile", getProfile)
router.post("/addfr", authenticatJWT, addFriend);
router.patch("/remfr", authenticatJWT, removeFriend);
router.delete('/:id',authenticatJWT,deleteUser );

export default router;
