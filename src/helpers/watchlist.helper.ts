import watchlistSchema from "../schemas/watchlist.schema";
import { IAuthReq } from "../types/IAuthReq";
import { Document } from "mongoose";

export const validateWatchlistRequest = (req: IAuthReq) => {
  const userId = req.user?._id;
  const tmdbID = String(req.query.tmdbID);
  const mediaType: "tv" | "movie" = req.query.mediaType as "tv" | "movie";

  if (!userId || !tmdbID) {
    throw new Error("Missing required fields");
  }

  if (mediaType && mediaType !== "tv" && mediaType !== "movie") {
    throw new Error("Invalid media type");
  }

  return { userId, tmdbID, mediaType };
};

export const userWatchlist = async (userId: string) => {
  let watchlist = await watchlistSchema.findOne({ userId });

  if (watchlist) {
    watchlist.medias.sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    return watchlist;
  }

  watchlist = new watchlistSchema({ userId, medias: [] });
  await watchlist.save();
  return watchlist;
};

export const isMediaInWatchlist = (
  watchlist: Document & IWatchlist,
  tmdbID: string
) => {
  const mediaIds = watchlist.medias.map((item) => item.tmdbID);
  return mediaIds.includes(tmdbID);
};

export const addMediaToWatchlist = async (
  watchlist: Document & IWatchlist,
  mediaItem: IMedia
) => {
  watchlist.medias.push(mediaItem);
  await watchlist.save();
  return watchlist;
};

export const removeMediaFromWatchlist = async (
  watchlist: Document & IWatchlist,
  tmdbID: string
) => {
  const index = watchlist.medias.findIndex((item) => item.tmdbID === tmdbID);

  if (index === -1) {
    throw new Error("Item not found in watchlist");
  }

  watchlist.medias.splice(index, 1);
  await watchlist.save();

  return watchlist;
};
