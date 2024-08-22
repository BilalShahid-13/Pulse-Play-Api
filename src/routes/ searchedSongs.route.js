import { Router } from "express";
import {
  Search,
  songSuggestion,
} from "../controllers/serchedSongs.controller.js";
import { trending } from "../controllers/trending.controller.js";

const searchRouter = Router();

searchRouter.post("/search", Search);
searchRouter.get("/trending", trending);
searchRouter.get("/songSuggestion", songSuggestion);

export default searchRouter;
