import jwt from "jsonwebtoken";

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
