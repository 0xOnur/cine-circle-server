import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const API_KEY = process.env.TMDB_API_KEY;

router.get("/*", async (req: Request, res: Response) => {
  const path = req.params[0];
  const query = req.query;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: {
        ...query,
        api_key: API_KEY,
        language: "en-US",
      },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
