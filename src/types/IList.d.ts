import { Document } from "mongoose";

interface IList extends Document {
  userId: string;
  listName: string;
  description: string;
  listType: {
    type: string;
    enum: ["tv", "movie"];
  };
  media: string[];
  createdAt: Date;
  updatedAt: Date;
}
