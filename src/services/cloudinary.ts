import dotenv from "dotenv";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Avatar Options for cloudinary
const avatarOptions: UploadApiOptions = {
  use_filename: true,
  allowed_formats: ["jpg", "png", "jpeg", "gif"],
  quality: "auto",
};

interface IUploadAvatar {
  file: Express.Multer.File;
  username: string;
}

// Upload Avatar
export const uploadAvatar = async ({ file, username }: IUploadAvatar) => {
  const folderPath = `CineCircle/Users/${username}`;

  const result = await cloudinary.uploader.upload(file.path, {
    ...avatarOptions,
    folder: folderPath,
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

// Delete Avatar
export const deleteAvatar = async (public_id: string) => {
  await cloudinary.uploader.destroy(public_id);
};
