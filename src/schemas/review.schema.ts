import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema<IReview>(
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
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    comment: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ userId: 1, tmdbID: 1 }, { unique: true });

export default mongoose.model<IReview>("Review", reviewSchema);
