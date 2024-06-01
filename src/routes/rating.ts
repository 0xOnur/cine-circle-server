import express from "express";
import {
  createOrUpdateUserRating,
  deleteUserRating,
  getUserRating,
} from "../controllers/rating.controller";

const ratingRoutes = express.Router();

ratingRoutes.get("/get-user-rating", getUserRating);
ratingRoutes.post("/create-or-update-user-rating", createOrUpdateUserRating);
ratingRoutes.delete("/delete-user-rating", deleteUserRating);

export default ratingRoutes;
