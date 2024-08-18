import { Router } from "express";
import {
  createUser,
  getSingleUser,
  getUsers,
} from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getSingleUser);
userRouter.post("/users", createUser);
