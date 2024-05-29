import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import listSchema from "../schemas/list.schema";
import { IAuthReq } from "../types/IAuthReq";
import getLists from "../helpers/get.lists";

// Get Lists
export const getUserLists = async (req: Request, res: Response) => {
  try {
    const username = String(req.query.username);
    const user = await userSchema
      .findOne({ username: username })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lists = await getLists(user._id);

    res.status(200).json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create List
export const createList = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;

    const list = new listSchema({
      userId,
      listName: String(req.query.listName),
      listType: String(req.query.listType),
      description: String(req.body.description),
    });

    await list.validate();
    await list.save();

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add to List
export const addToList = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const listId = String(req.query.listId);
    const tmdbID = String(req.query.tmdbID);
    const mediaType =
      req.body.mediaType === "tv" || req.body.mediaType === "movie"
        ? req.body.mediaType
        : null;

    if (!mediaType) {
      return res.status(400).json({ message: "Invalid media type" });
    }

    const list = await listSchema.findOne({ _id: listId, userId });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const listItemIndex = list.medias.findIndex(
      (item) => item.tmdbID === tmdbID
    );
    if (listItemIndex !== -1) {
      return res.status(400).json({ message: "Item already in list" });
    }

    const mediaItem = {
      tmdbID: tmdbID,

      mediaType: mediaType,
      dateAdded: new Date(),
    };

    list.medias.push(mediaItem);

    await list.save();

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from List
export const removeFromList = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const listId = String(req.query.listId);
    const tmdbID = String(req.query.tmdbID);

    const list = await listSchema.findOne({ _id: listId, userId });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const index = list.medias.findIndex((item) => item.tmdbID === tmdbID);

    if (index === -1) {
      return res.status(400).json({ message: "Item not found in list" });
    }

    list.medias.splice(index, 1);

    await list.save();

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
