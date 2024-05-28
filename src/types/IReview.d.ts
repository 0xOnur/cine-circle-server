interface IReview {
  userId: IObjectId;
  tmdbID: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
