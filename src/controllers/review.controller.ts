import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import {
  getMediaReviewsHelper,
  getUserReviewsHelper,
  validateReviewRequest,
} from "../helpers/review.helper";

// Get Reviews
export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const { username } = validateReviewRequest(req);

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await userSchema
      .findOne({ username: username })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviews = await getUserReviewsHelper(user._id);

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Media Reviews
export const getMediaReviews = async (req: Request, res: Response) => {
  try {
    const { tmdbID } = validateReviewRequest(req);
    console.log("🚀 ~ getMediaReviews ~ tmdbID:", tmdbID)

    if (!tmdbID) {
      return res.status(400).json({ message: "TMDB ID is required" });
    }

    const reviews = await getMediaReviewsHelper(tmdbID);

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
