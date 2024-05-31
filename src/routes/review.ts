import express from "express";
import { getMediaReviews, getUserReviews } from "../controllers/review.controller";

const reviewRoutes = express.Router();

reviewRoutes.get("/get-user-reviews", getUserReviews);
reviewRoutes.get("/get-media-reviews", getMediaReviews);

export default reviewRoutes;
