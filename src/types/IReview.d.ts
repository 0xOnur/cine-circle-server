interface IReview {
  userId: IObjectId;
  showId: number;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}
