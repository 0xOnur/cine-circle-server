import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user";
import watchlistRoutes from "./routes/watchlist";
import listRoutes from "./routes/list";

dotenv.config();

export const app = express();
export const server = createServer(app);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ credentials: true, origin: clientOrigin }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/list", listRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(String(process.env.CONNECTION_URL))
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Serving client from origin: ${clientOrigin}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
