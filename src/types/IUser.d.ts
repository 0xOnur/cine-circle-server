import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  watchlist: IWatchlist;
  role: string;
  name: string;
  surname: string;
  avatar: string;
  about: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
