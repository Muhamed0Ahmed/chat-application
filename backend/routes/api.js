import express from "express";
import { validateUserRegister } from "../middleware/vlidateRegister.js";
import { login, registerUser } from "../controllers/userControllers.js";

const router = express.Router();


router.post("/register",validateUserRegister,  registerUser);
router.post("/login", login)
router.get("/",(req, res) =>{
    res.send("the firs api end point");
})

export default router