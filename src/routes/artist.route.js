import { Router } from "express";
import { fetchArtist } from "../controllers/Artist.controller.js";

const artistRouter = Router();

artistRouter.post("/fetchSongs", fetchArtist);

export { artistRouter };
