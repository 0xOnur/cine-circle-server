import { Request, Response } from "express";
import {
  createReviewHelper,
  deleteReviewHelper,
  getMediaReviewsHelper,
  getUserMediaReviewHelper,
  getUserReviewsHelper,
  updateReviewHelper,
  validateReviewRequest,
} from "../helpers/review.helper";
import { IAuthReq } from "../types/IAuthReq";

// Get Reviews
export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const { username } = validateReviewRequest(req);

    const reviews = await getUserReviewsHelper(username);

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Media Reviews
export const getMediaReviews = async (req: Request, res: Response) => {
  try {
    const { tmdbID } = validateReviewRequest(req);

    if (!tmdbID) {
      return res.status(400).json({ message: "TMDB ID is required" });
    }

    const reviews = await getMediaReviewsHelper(tmdbID);

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Media Review
export const getUserMediaReview = async (req: Request, res: Response) => {
  try {
    const { username, tmdbID } = validateReviewRequest(req);

    const review = await getUserMediaReviewHelper(username, tmdbID);

    res.status(200).json(review);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create Review
export const createReview = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID } = validateReviewRequest(req);
    const { mediaType, title, comment, spoiler } = req.body;

    if (!mediaType || !title || !comment) {
      return res
        .status(400)
        .json({ message: "Title comment and media type are required" });
    }

    const newReview = await createReviewHelper(
      userId,
      tmdbID,
      mediaType,
      title,
      comment,
      spoiler
    );

    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update Review
export const updateReview = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID } = validateReviewRequest(req);
    const { title, comment, spoiler } = req.body;

    if (!title || !comment) {
      return res
        .status(400)
        .json({ message: "Title and comment type are required" });
    }

    const updatedReview = await updateReviewHelper(
      userId,
      tmdbID,
      title,
      comment,
      spoiler
    );

    res.status(200).json(updatedReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Review
export const deleteReview = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID } = validateReviewRequest(req);

    const result = await deleteReviewHelper(userId, tmdbID);

    if (!result) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
