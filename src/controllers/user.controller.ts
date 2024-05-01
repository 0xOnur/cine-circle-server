import { Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import { generateToken } from "./token.controller";
import bcrypt from "bcrypt";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
    });

    await user.validate();

    await user.save();

    const tokens = generateToken(user._id);
    res.status(201).json({ user, tokens });
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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateToken(user._id);
    res.status(200).json({ user, tokens });
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
