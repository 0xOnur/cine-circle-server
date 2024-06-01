import express from "express";
import {
  createOrUpdateUserRating,
  deleteUserRating,
  getUserRating,
  getMediaRatings,
} from "../controllers/rating.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const ratingRoutes = express.Router();

ratingRoutes.get("/get-user-rating", getUserRating);
ratingRoutes.get("/get-media-ratings", getMediaRatings);

ratingRoutes.post("/create-or-update-rating", tokenMiddleware, createOrUpdateUserRating);
ratingRoutes.delete("/delete-rating", tokenMiddleware, deleteUserRating);

export default ratingRoutes;
