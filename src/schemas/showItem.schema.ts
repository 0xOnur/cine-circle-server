import { Schema } from "mongoose";

const showItemSchema = new Schema({
  showId: {
    type: Number, // TMDB ID
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now, // Current date
  },
});

export default showItemSchema;
