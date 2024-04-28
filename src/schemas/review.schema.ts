import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    showId: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    review: {
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

reviewSchema.index({ userId: 1, showId: 1 }, { unique: true });

export default mongoose.model<IReview>("Review", reviewSchema);
