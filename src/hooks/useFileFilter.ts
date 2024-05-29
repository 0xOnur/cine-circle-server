import { Request as ExpressRequest } from "express";
import multer from "multer";

export interface Request extends ExpressRequest {
  fileValidationError?: string;
}

export const useFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  // Accept image files only
  if (!file.mimetype.startsWith("image/")) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
