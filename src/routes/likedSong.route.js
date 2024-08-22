import { Router } from "express";
import {
  saveLikedSongs,
  viewLikedSongs,
} from "../controllers/likedSongs.controller.js";
import { checkForCookie } from "../middlewares/authentication.middleware.js";

const likedRouter = Router();

likedRouter.get("/viewSongs", checkForCookie, viewLikedSongs);
likedRouter.post("/addSong", checkForCookie, saveLikedSongs);

export { likedRouter };
