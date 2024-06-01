import { Request, Response } from "express";
import { IAuthReq } from "../types/IAuthReq";
import {
  getRatingHelper,
  createOrUpdateRatingHelper,
  deleteRatingHelper,
  getMediaRatingsHelper,
  validateRatingRequest,
} from "../helpers/rating.helper";

// Create or Update Rating
export const createOrUpdateUserRating = async (
  req: IAuthReq,
  res: Response
) => {
  try {
    const { userId, tmdbID, mediaType, rating } = validateRatingRequest(req);

    if (rating === null || rating < 0 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be between 0 and 10" });
    }

    const updatedRating = await createOrUpdateRatingHelper(
      userId!,
      Number(tmdbID),
      mediaType,
      rating
    );

    res.status(200).json(updatedRating);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Rating
export const getUserRating = async (req: Request, res: Response) => {
  try {
    const { username, tmdbID } = validateRatingRequest(req);

    const rating = await getRatingHelper(username, Number(tmdbID));

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json(rating);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User Rating
export const deleteUserRating = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID } = validateRatingRequest(req);

    const result = await deleteRatingHelper(userId!, Number(tmdbID));

    if (!result) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Media Rating
export const getMediaRatings = async (req: Request, res: Response) => {
  try {
    const { tmdbID, mediaType } = validateRatingRequest(req);
    const { ratings, averageRating } = await getMediaRatingsHelper(
      Number(tmdbID),
      mediaType
    );

    res.status(200).json({ ratings, averageRating });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
