import mongoose, { Schema } from "mongoose";
import showItemSchema from "./showItem.schema";

const watchlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: String,
      required: true,
      minlength: 3
    },
    shows: [showItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

watchlistSchema.index({ userId: 1 });

watchlistSchema.virtual('itemCount').get(function () {
    return this.shows.length;
  });

export default mongoose.model<IWatchlist>("Watchlist", watchlistSchema);
