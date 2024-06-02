import express from "express";
import {
  getList,
  addToList,
  createList,
  getUserLists,
  removeFromList,
} from "../controllers/list.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const listRoutes = express.Router();

listRoutes.get("/get-lists", getUserLists);
listRoutes.get("/get-list", getList);
listRoutes.post("/create-list", tokenMiddleware, createList);

listRoutes.put("/add-to-list", tokenMiddleware, addToList);
listRoutes.delete("/remove-from-list", tokenMiddleware, removeFromList);

export default listRoutes;
