import express from "express";
import {
  createUser,
  emailExists,
  getUser,
  loginUser,
  updateUser,
  usernameExists,
} from "../controllers/user.controller";
import { updateAccessToken } from "../controllers/token.controller";
import tokenMiddleware from "../middlewares/token.middleware";
import { imageMiddleware } from "../middlewares/image.middleware";

const userRoutes = express.Router();

userRoutes.post("/update-token", updateAccessToken);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", createUser);

userRoutes.get("/username-exists/:username", usernameExists);
userRoutes.get("/email-exists/:email", emailExists);

userRoutes.get("/get-user", getUser);

userRoutes.post("/edit-profile", tokenMiddleware, imageMiddleware, updateUser);

export default userRoutes;
