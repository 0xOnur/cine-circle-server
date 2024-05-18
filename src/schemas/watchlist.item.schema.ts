import { Schema } from "mongoose";

const watchListItemSchema = new Schema<IWatchlist>(
  {
    type: {
      type: String,
      enum: ["tv", "movie"],
      required: true,
    },
    tmdbID: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // Embedded schema olduğu için _id oluşturma.
  }
);

export default watchListItemSchema;
