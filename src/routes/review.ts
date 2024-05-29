import express from "express";
import { getUserReviews } from "../controllers/review.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const reviewRoutes = express.Router();

reviewRoutes.get("/get-user-reviews", getUserReviews);

export default reviewRoutes;
