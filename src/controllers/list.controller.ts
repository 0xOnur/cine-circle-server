import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import listSchema from "../schemas/list.schema";
import { IAuthReq } from "../types/IAuthReq";
import {
  addMediaToListHelper,
  createNewListHelper,
  findListByIdhelper,
  getListHelper,
  getListsHelper,
  removeMediaFromListHelper,
  validateListRequest,
} from "../helpers/list.helper";

// Get Lists
export const getUserLists = async (req: Request, res: Response) => {
  try {
    const { username } = validateListRequest(req);

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await userSchema.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lists = await getListsHelper(user._id);

    res.status(200).json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get List
export const getList = async (req: Request, res: Response) => {
  try {
    const { listId } = validateListRequest(req);

    if (!listId) {
      return res.status(400).json({ message: "List ID is required" });
    }

    const list = await getListHelper(listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create List
export const createList = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, listName, listType, description } =
      validateListRequest(req);

    const listData = new listSchema({
      userId,
      listName,
      listType,
      description,
    });

    const list = await createNewListHelper(listData);

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add to List
export const addToList = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, listId, tmdbID, mediaType } = validateListRequest(req);

    if (!listId || !tmdbID || !mediaType) {
      return res
        .status(400)
        .json({ message: "List ID, TMDB ID, and media type are required" });
    }

    const list = await findListByIdhelper(listId, userId!);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const mediaItem = { tmdbID, mediaType, dateAdded: new Date() };
    const updatedList = await addMediaToListHelper(list, mediaItem);

    res.status(200).json(updatedList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from List
export const removeFromList = async (req: IAuthReq, res: Response) => {
  try {
    const { userId, listId, tmdbID } = validateListRequest(req);

    if (!listId || !tmdbID) {
      return res
        .status(400)
        .json({ message: "List ID and TMDB ID are required" });
    }

    const list = await findListByIdhelper(listId, userId!);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const updatedList = await removeMediaFromListHelper(list, tmdbID);

    res.status(200).json(updatedList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
