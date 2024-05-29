import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import watchlistSchema from "../schemas/watchlist.schema";
import { IAuthReq } from "../types/IAuthReq";
import getWatchlist from "../helpers/get.watchlist";

// Get User Watchlist
export const getUserWatchlist = async (req: Request, res: Response) => {
  try {
    const username = String(req.query.username);
    const user = await userSchema.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const watchlist = await getWatchlist(user._id);

    res.status(200).json(watchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add media to watchlist
export const addToWatchlist = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const tmdbID = String(req.query.tmdbID);
    const mediaType: "tv" | "movie" = req.query.mediaType as "tv" | "movie";

    if (!userId || !tmdbID || !mediaType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mediaType || (mediaType !== "tv" && mediaType !== "movie")) {
      return res.status(400).json({ message: "Invalid media type" });
    }

    const watchlist = await getWatchlist(userId);

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const mediaIds = watchlist.medias.map((item) => item.tmdbID);

    if (mediaIds.includes(tmdbID)) {
      return res.status(400).json({ message: "Item already in watchlist" });
    }

    const mediaItem = {
      mediaType: mediaType,
      tmdbID: tmdbID,
      dateAdded: new Date(),
    };

    watchlist.medias.push(mediaItem);

    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove media from watchlist
export const removeFromWatchlist = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const tmdbID = String(req.query.tmdbID);

    if (!userId || !tmdbID) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const watchlist = await getWatchlist(userId);

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const mediaIds = watchlist.medias.map((item) => item.tmdbID);
    const index = mediaIds.indexOf(tmdbID);

    if (index === -1) {
      return res.status(400).json({ message: "Item not found in watchlist" });
    }

    watchlist.medias.splice(index, 1);

    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
