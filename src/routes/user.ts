import express from "express";
import {
  createUser,
  emailExists,
  getUser,
  loginUser,
  usernameExists,
  getUserActivity
} from "../controllers/user.controller";
import { updateAccessToken } from "../controllers/token.controller";

const userRoutes = express.Router();

userRoutes.post("/update-token", updateAccessToken);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", createUser);

userRoutes.get("/username-exists/:username", usernameExists);
userRoutes.get("/email-exists/:email", emailExists);

userRoutes.get("/get-user", getUser);
userRoutes.get("/get-user-activity", getUserActivity);

export default userRoutes;
