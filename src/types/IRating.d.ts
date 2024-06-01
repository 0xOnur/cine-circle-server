interface IRating extends Document {
  userId: IObjectId;
  tmdbID: number;
  mediaType: "movie" | "tv";
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
