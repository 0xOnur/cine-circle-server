import ratingSchema from "../schemas/rating.schema";
import { IAuthReq } from "../types/IAuthReq";

export const validateRatingRequest = (req: IAuthReq) => {
  const userId = req.user?._id;
  const username = req.query.username ? String(req.query.username) : null;
  const tmdbID = req.query.tmdbID ? String(req.query.tmdbID) : null;
  const rating = req.query.rating ? Number(req.query.rating) : null;

  if (
    !userId ||
    !username ||
    !tmdbID ||
    (rating !== null && (rating < 0 || rating > 10))
  ) {
    throw new Error(
      "User ID, Username, TMDB ID, and a valid rating (if provided) are required"
    );
  }

  return { userId, username, tmdbID, rating };
};

export const getRating = async (userId: string, tmdbID: number) => {
  return await ratingSchema.findOne({ userId, tmdbID });
};

export const createOrUpdateRating = async (
  userId: string,
  tmdbID: number,
  rating: number
) => {
  const existingRating = await ratingSchema.findOneAndUpdate(
    { userId, tmdbID },
    { rating },
    { new: true, upsert: true }
  );
  return existingRating;
};

export const deleteRating = async (userId: string, tmdbID: number) => {
  const result = await ratingSchema.findOneAndDelete({ userId, tmdbID });
  return result;
};
