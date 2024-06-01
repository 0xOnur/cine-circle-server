// controllers/ratingController.ts

import { Request, Response } from "express";
import { IAuthReq } from "../types/IAuthReq";
import {
  createOrUpdateRating,
  deleteRating,
  getRating,
  validateRatingRequest,
} from "../helpers/rating.helper";

// Create or Update Rating
export const createOrUpdateUserRating = async (
  req: IAuthReq,
  res: Response
) => {
  try {
    const { userId, tmdbID, rating } = validateRatingRequest(req);

    if (rating === null) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const updatedRating = await createOrUpdateRating(
      userId,
      Number(tmdbID),
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

    const rating = await getRating(username, Number(tmdbID));

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

    const result = await deleteRating(userId, Number(tmdbID));

    if (!result) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
