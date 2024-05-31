import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import { generateToken } from "./token.controller";
import bcrypt from "bcrypt";
import { IAuthReq } from "../types/IAuthReq";
import { deleteAvatar, uploadAvatar } from "../services/cloudinary";
import { userWatchlist } from "../helpers/watchlist.helper";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new userSchema({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      location: req.body.location,
      about: req.body.about,
      password: req.body.password,
    });

    //  username and email available
    const username = await userSchema.findOne({ username: req.body.username });
    const email = await userSchema.findOne({ email: req.body.email });

    if (username) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await user.validate();

    await user.save();

    user.password = "";

    const watchlist = await userWatchlist(user._id);

    const tokens = generateToken(user._id);
    res.status(201).json({ user, tokens, watchlist });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation failed" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    user.password = "";

    const watchlist = await userWatchlist(user._id);

    const tokens = generateToken(user._id);
    res.status(200).json({ user, tokens, watchlist });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Username Exists
export const usernameExists = async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send(false);
    }

    res.status(200).send(true);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Email Exists
export const emailExists = async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send(false);
    }

    res.status(200).send(true);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get User
export const getUser = async (req: Request, res: Response) => {
  try {
    const username = String(req.query.username);

    const user = await userSchema
      .findOne({ username: username })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
export const updateUser = async (req: IAuthReq, res: Response) => {
  try {
    const user = await userSchema.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUserData = {
      avatar: user.avatar,
      avatarId: user.avatarId,
      name: req.body.name || user.name,
      surname: req.body.surname || user.surname,
      location: req.body.location || user.location,
      about: req.body.about || user.about,
    };

    if (req.files) {
      const avatar = (req.files as Express.Multer.File[])[0];

      if (avatar) {
        if (user.avatarId) {
          await deleteAvatar(user.avatarId);
        }

        const newAvatar = await uploadAvatar({
          file: avatar,
          username: user.username,
        });

        newUserData.avatar = newAvatar.url;
        newUserData.avatarId = newAvatar.public_id;
      }
    }

    Object.assign(user, newUserData);
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
