interface IRating extends Document {
  userId: IObjectId;
  tmdbID: number;
  rating: number;
}
