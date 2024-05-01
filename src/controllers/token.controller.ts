import userSchema from "../schemas/user.schema";
import { IAuthReq } from "../types/IAuthReq";
import { Response } from "express";
import jwt from "jsonwebtoken";

//  Generate Tokens
export const generateToken = (userId: string) => {
  try {
    const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_TOKEN_LIFE,
    });
    const refreshToken = jwt.sign(
      { _id: userId },
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

//  Generate Access Token
export const generateAccessToken = (userId: string) => {
  try {
    const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_TOKEN_LIFE,
    });

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

// Update Access Token with Refresh Token
export const updateAccessToken = async (req: IAuthReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const refreshToken = req.headers["x-refresh-token"];

    if (!userId || !refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userSchema.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(
      refreshToken as string,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    ) as IDecoded;

    if (decodedToken._id !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = generateAccessToken(userId);
    return res.status(200).json(accessToken);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
