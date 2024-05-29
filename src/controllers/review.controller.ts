import { Request, Response } from "express";
import { IAuthReq } from "../types/IAuthReq";
import getReviews from "../helpers/get.reviews";
import userSchema from "../schemas/user.schema";

// Get Reviews
export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const username = String(req.query.username);

    const user = await userSchema
      .findOne({ username: username })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviews = await getReviews(user._id);

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
