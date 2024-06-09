import express from "express";
import { login, logout, signup,getUser } from "../controllers/auth.controller";


const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/:id", getUser);

export default authRouter;
