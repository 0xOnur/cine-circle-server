interface IWatchlist extends Document {
  userId: IObjectId;
  medias: IMedia[];
  createdAt: Date;
  updatedAt: Date;
}
