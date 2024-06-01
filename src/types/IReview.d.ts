interface IReview {
  userId: IObjectId;
  tmdbID: number;
  mediaType: "movie" | "tv";
  title: string;
  comment: string;
  spoiler: boolean;
  createdAt: Date;
  updatedAt: Date;
}
