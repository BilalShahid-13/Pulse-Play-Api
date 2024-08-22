import { Router } from "express";
import { fetchArtist } from "../controllers/Artist.controller.js";

const artistRouter = Router();

artistRouter.get("/fetchSongs", fetchArtist);

export { artistRouter };
