import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authController from "../controllers/authController.js";
const authRouter = express.Router();


authRouter.post('/register',asyncHandler(authController.registerUser));
authRouter.post('/login',asyncHandler(authController.loginUser));



export default authRouter;