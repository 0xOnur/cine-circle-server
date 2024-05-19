import mongoose, { Schema, Document } from 'mongoose';

interface IWatchlistItem {
  mediaType: 'tv' | 'movie';
  tmdbID: string;
  dateAdded: Date;
}

interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId;
  items: IWatchlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const watchlistItemSchema = new Schema<IWatchlistItem>({
  mediaType: {
    type: String,
    enum: ['tv', 'movie'],
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
});

const watchlistSchema = new Schema<IWatchlist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [watchlistItemSchema],
}, {
  timestamps: true,
});

export default mongoose.model<IWatchlist>('Watchlist', watchlistSchema);
