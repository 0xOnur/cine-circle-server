import { Request, Response } from "express";
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
export const updateAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];
    console.log(refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(
        refreshToken as string,
        process.env.JWT_REFRESH_TOKEN_SECRET!
      ) as IDecoded;

      const accessToken = generateAccessToken(decodedToken._id);

      return res.status(200).json(accessToken);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
