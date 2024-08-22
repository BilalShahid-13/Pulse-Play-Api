import { Router } from "express";
import { fetchAlbum } from "../controllers/Album.controller.js";

const albumRouter = Router();

albumRouter.post("/fetchAlbum", fetchAlbum);

export { albumRouter };
