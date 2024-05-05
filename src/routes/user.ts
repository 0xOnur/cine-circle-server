import express from "express";
import {
  createUser,
  emailExists,
  loginUser,
  usernameExists,
} from "../controllers/user.controller";
import { updateAccessToken } from "../controllers/token.controller";

const userRoutes = express.Router();

userRoutes.post("/update-token", updateAccessToken);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", createUser);

userRoutes.get("/username-exists/:username", usernameExists);
userRoutes.get("/email-exists/:email", emailExists);

export default userRoutes;
