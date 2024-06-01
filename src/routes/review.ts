import express from "express";
import {
  getMediaReviews,
  getUserReviews,
  getUserMediaReview,
  createReview,
  updateReview,
} from "../controllers/review.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const reviewRoutes = express.Router();

reviewRoutes.get("/get-user-reviews", getUserReviews);
reviewRoutes.get("/get-media-reviews", getMediaReviews);
reviewRoutes.get("/get-user-media-review", getUserMediaReview);

reviewRoutes.post("/create-review", tokenMiddleware, createReview);
reviewRoutes.put("/update-review", tokenMiddleware, updateReview);

export default reviewRoutes;
