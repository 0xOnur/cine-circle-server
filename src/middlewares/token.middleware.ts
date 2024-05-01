import { IAuthReq } from "../types/IAuthReq";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenMiddleware = async (
  req: IAuthReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken == null) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded as IDecoded;
      next();
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default tokenMiddleware;
