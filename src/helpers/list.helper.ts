import { Document } from "mongoose";
import listSchema from "../schemas/list.schema";
import { IAuthReq } from "../types/IAuthReq";

export const validateListRequest = (req: IAuthReq) => {
  const userId = req.user?._id;
  const username = String(req.query.username);
  const listId = String(req.query.listId);
  const tmdbID = String(req.query.tmdbID);
  const listName = String(req.query.listName);
  const listType = String(req.query.listType) as "movie" | "tv";
  const description = String(req.body.description);
  const mediaType = String(req.body.mediaType) as "tv" | "movie";

  return {
    userId,
    listId,
    tmdbID,
    mediaType,
    listName,
    listType,
    description,
    username,
  };
};

export const getLists = async (userId: string) => {
  return await listSchema.find({ userId });
};

export const findListById = async (listId: string, userId: string) => {
  return await listSchema.findOne({ _id: listId, userId });
};

export const createNewList = async (list: Document & IList) => {
  await list.save();
  return list;
};

export const addMediaToList = async (
  list: Document & IList,
  mediaItem: IMedia
) => {
  list.medias.push(mediaItem);
  await list.save();
  return list;
};

export const removeMediaFromList = async (
  list: Document & IList,
  tmdbID: string
) => {
  const index = list.medias.findIndex((item) => item.tmdbID === tmdbID);
  if (index === -1) {
    throw new Error("Item not found in list");
  }
  list.medias.splice(index, 1);
  await list.save();
  return list;
};
