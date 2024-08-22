import { Router } from "express";
import { genres } from "../controllers/genres.controller.js";

const genresRouter = Router();

genresRouter.post("/top", genres);

export { genresRouter };
