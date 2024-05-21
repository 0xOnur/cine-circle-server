import express from "express";
import {
  addToWatchlist,
  getUserWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlist.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const watchlistRoutes = express.Router();

watchlistRoutes.get("/get-watchlist", getUserWatchlist);
watchlistRoutes.post("/add-watchlist", tokenMiddleware, addToWatchlist);
watchlistRoutes.delete(
  "/remove-watchlist",
  tokenMiddleware,
  removeFromWatchlist
);

export default watchlistRoutes;
