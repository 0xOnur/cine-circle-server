import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/IUser";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import watchListItemSchema from "./watchlist.schema";
import watchlistSchema from "./watchlist.schema";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    surname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    about: {
      type: String,
      maxlength: 2500,
    },
    location: {
      type: String,
      maxlength: 100,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, username: 1 });

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  if (user.isNew) {
    // Yeni kullanıcı oluşturulurken watchlist belgesi oluşturuyoruz
    const watchlist = new watchlistSchema({ userId: user._id, items: [] });
    await watchlist.save();
  }

  next();
});

export default mongoose.model<IUser>("User", userSchema);
