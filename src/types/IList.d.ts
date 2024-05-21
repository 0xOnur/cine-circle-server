interface IList extends Document {
  userId: IObjectId;
  listName: string;
  description: string;
  listType: {
    type: string;
    enum: ["tv", "movie"];
  };
  medias: IMedia[];
  createdAt: Date;
  updatedAt: Date;
}
