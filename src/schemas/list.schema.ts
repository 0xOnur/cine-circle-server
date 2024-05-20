import mongoose, { Schema } from "mongoose";
import { IList } from "../types/IList";

const mediaItemSchema = new Schema(
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

const listSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 2500,
    },
    listType: {
      type: String,
      enum: ["tv", "movie"],
      required: true,
    },
    media: [mediaItemSchema],
  },
  {
    timestamps: true,
  }
);

listSchema.index({ userId: 1, listName: 1 });

// Virtual field for user details
listSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model<IList>("List", listSchema);
