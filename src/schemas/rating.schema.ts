import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema<IRating>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbID: {
      type: Number,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.index({ userId: 1, tmdbID: 1 }, { unique: true });

export default mongoose.model<IRating>("Rating", ratingSchema);
