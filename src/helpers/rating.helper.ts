import ratingSchema from "../schemas/rating.schema";
import { IAuthReq } from "../types/IAuthReq";

export const validateRatingRequest = (req: IAuthReq) => {
  const userId = req.user?._id;
  const username = String(req.query.username);
  const tmdbID = String(req.query.tmdbID);
  const rating = Number(req.query.rating);
  const mediaType = String(req.query.mediaType) as "tv" | "movie";

  return { userId, username, tmdbID, mediaType, rating };
};

export const getRatingHelper = async (userId: string, tmdbID: number) => {
  return await ratingSchema
    .findOne({ userId, tmdbID })
    .populate("userId", "-password");
};

export const createOrUpdateRatingHelper = async (
  userId: string,
  tmdbID: number,
  mediaType: "movie" | "tv",
  rating: number
) => {
  const existingRating = await ratingSchema.findOneAndUpdate(
    { userId, tmdbID },
    { rating, mediaType },
    { new: true, upsert: true }
  );
  return existingRating;
};

export const deleteRatingHelper = async (userId: string, tmdbID: number) => {
  const result = await ratingSchema.findOneAndDelete({ userId, tmdbID });
  return result;
};

export const getMediaRatingsHelper = async (
  tmdbID: number,
  mediaType: "movie" | "tv"
) => {
  const ratings = await ratingSchema
    .find({ tmdbID, mediaType })
    .sort({ createdAt: -1 })
    .populate("userId", "-password");

  const averageRating =
    ratings.map((rating) => rating.rating).reduce((a, b) => a + b, 0) /
    ratings.length;

  return { ratings, averageRating };
};
