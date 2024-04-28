interface IWatchlist extends Document {
  userId: IObjectId;
  listName: string;
  shows: IShowItem[];
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}
