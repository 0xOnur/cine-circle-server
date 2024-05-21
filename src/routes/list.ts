import express from "express";
import { createList, getUserLists } from "../controllers/list.controller";
import tokenMiddleware from "../middlewares/token.middleware";

const listRoutes = express.Router();

listRoutes.get("/get-lists", getUserLists);
listRoutes.post("/create-list", tokenMiddleware, createList);

export default listRoutes;
