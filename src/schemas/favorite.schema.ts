import mongoose, { Schema } from "mongoose";
import showItemSchema from "./showItem.schema";

const favoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorites: [showItemSchema],
  },
  {
    timestamps: true,
  }
);
