import { RequestHandler } from "express";
import multer, { MulterError } from "multer";
import { Request as ExpressRequest } from "express";
import { useFileFilter } from "../hooks/useFileFilter";

export interface Request extends ExpressRequest {
  fileValidationError?: string;
}
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: useFileFilter,
}).any();

const handleMulterErrors = (err: any, req: Request, res: any, next: any) => {
  if (err instanceof MulterError) {
    // A Multer error occurred when uploading.
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // An unknown error occurred when uploading.
    return res.status(400).json({ message: err.message });
  } else if (req.fileValidationError) {
    // Check if file type error occurred and send error message
    return res.status(400).json({ message: req.fileValidationError });
  }
  next();
};

export const imageMiddleware: RequestHandler = (req, res, next) => {
  upload(req, res, (err: any) => handleMulterErrors(err, req, res, next));
};
