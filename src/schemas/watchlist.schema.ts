import mongoose, { Schema } from "mongoose";

const watchlistItemSchema = new Schema<IMedia>(
  {
    mediaType: {
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
    _id: false, // Embedded schema içinde _id oluşturma.
  }
);

const watchlistSchema = new Schema<IWatchlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medias: [watchlistItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWatchlist>("Watchlist", watchlistSchema);
