import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import { IAuthReq } from "../types/IAuthReq";
import {
  addMediaToWatchlist,
  isMediaInWatchlist,
  removeMediaFromWatchlist,
  userWatchlist,
  validateWatchlistRequest,
} from "../helpers/watchlist.helper";

// Get User Watchlist
export const getUserWatchlist = async (req: Request, res: Response) => {
  try {
    const username = String(req.query.username);
    const user = await userSchema.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const watchlist = await userWatchlist(user._id);

    res.status(200).json(watchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add media to watchlist
export const addToWatchlist = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID, mediaType } = validateWatchlistRequest(req);

    if (!mediaType) {
      return res
        .status(400)
        .json({ message: "Media type is required for adding to watchlist" });
    }

    const watchlist = await userWatchlist(userId);

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    if (isMediaInWatchlist(watchlist, tmdbID)) {
      return res.status(400).json({ message: "Item already in watchlist" });
    }

    const mediaItem = {
      mediaType: mediaType,
      tmdbID: tmdbID,
      dateAdded: new Date(),
    };

    const updatedWatchlist = await addMediaToWatchlist(watchlist, mediaItem);

    res.status(200).json(updatedWatchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove media from watchlist
export const removeFromWatchlist = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, tmdbID } = validateWatchlistRequest(req);

    const watchlist = await userWatchlist(userId);

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const updatedWatchlist = await removeMediaFromWatchlist(watchlist, tmdbID);

    res.status(200).json(updatedWatchlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
