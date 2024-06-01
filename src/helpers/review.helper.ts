import reviewSchema from "../schemas/review.schema";
import userSchema from "../schemas/user.schema";
import { IAuthReq } from "../types/IAuthReq";

export const validateReviewRequest = (req: IAuthReq) => {
  const userId = String(req.user?._id);
  const username = String(req.query.username);
  const tmdbID = String(req.query.tmdbID);

  return { userId, username, tmdbID };
};

export const getUserReviewsHelper = async (username: string) => {
  const user = await userSchema.findOne({ username }).select("_id");

  if (!username) {
    throw new Error("Username is required");
  }

  const reviews = await reviewSchema
    .find({ userId: user?._id })
    .populate("userId", "-password")
    .sort({ createdAt: -1 });
  return reviews;
};

export const getMediaReviewsHelper = async (tmdbID: string) => {
  if (!tmdbID) {
    throw new Error("TMDB ID is required");
  }

  const reviews = await reviewSchema
    .find({ tmdbID })
    .populate("userId", "-password")
    .sort({ createdAt: -1 });
  return reviews;
};

export const getUserMediaReviewHelper = async (
  username: string,
  tmdbID: string
) => {
  const user = await userSchema.findOne({ username }).select("_id");

  if (!user) {
    throw new Error("User not found");
  }

  const review = await reviewSchema.findOne({ userId: user._id, tmdbID });

  return review;
};

export const createReviewHelper = async (
  userId: string,
  tmdbID: string,
  mediaType: "movie" | "tv",
  title: string,
  comment: string,
  spoiler: boolean
) => {
  const newReview = new reviewSchema({
    userId,
    tmdbID,
    mediaType,
    title,
    comment,
    spoiler,
  });

  await newReview.save();
  return newReview;
};

export const updateReviewHelper = async (
  userId: string,
  tmdbID: string,
  title: string,
  comment: string,
  spoiler: boolean
) => {
  const updatedReview = await reviewSchema.findOneAndUpdate(
    { userId, tmdbID },
    { title, comment, spoiler },
    { new: true }
  );

  if (!updatedReview) {
    throw new Error("Review not found");
  }

  return updatedReview;
};
