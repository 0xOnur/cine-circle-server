import express from "express";
import {
  addToWatchlist,
  createUser,
  emailExists,
  getUserLists,
  getUser,
  getUserWatchlist,
  loginUser,
  removeFromWatchlist,
  usernameExists,
  createList,
} from "../controllers/user.controller";
import { updateAccessToken } from "../controllers/token.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const userRoutes = express.Router();

userRoutes.post("/update-token", updateAccessToken);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", createUser);

userRoutes.get("/get-watchlist", getUserWatchlist);
userRoutes.post("/add-watchlist", tokenMiddleware, addToWatchlist);
userRoutes.delete("/remove-watchlist", tokenMiddleware, removeFromWatchlist);

userRoutes.get("/get-lists", getUserLists);
userRoutes.post("/create-list", tokenMiddleware, createList);

userRoutes.get("/username-exists/:username", usernameExists);
userRoutes.get("/email-exists/:email", emailExists);

userRoutes.get("/get-user", getUser);

export default userRoutes;
