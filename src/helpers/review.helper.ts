import { Request } from "express";
import reviewSchema from "../schemas/review.schema";

export const validateReviewRequest = (req: Request) => {
  const username = String(req.query.username);
  const tmdbID = String(req.query.tmdbID);

  return { username, tmdbID };
};

export const getUserReviewsHelper = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const reviews = await reviewSchema.find({ userId }).sort({ createdAt: -1 });
  return reviews;
};

export const getMediaReviewsHelper = async (tmdbID: string) => {
  if (!tmdbID) {
    throw new Error("TMDB ID is required");
  }

  const reviews = await reviewSchema.find({ tmdbID }).sort({ createdAt: -1 });
  return reviews;
};
