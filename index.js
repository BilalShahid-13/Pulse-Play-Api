import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// middlewares
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  })
);
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import connectDB from "./src/config/db.connect.js";
import userRouter from "./src/routes/registration.route.js";
import searchRouter from "./src/routes/ searchedSongs.route.js";
import { likedRouter } from "./src/routes/likedSong.route.js";
import { albumRouter } from "./src/routes/searchedAlbum.route.js";
import { genresRouter } from "./src/routes/genres.route.js";
import { artistRouter } from "./src/routes/artist.route.js";

// db
connectDB();

// routes
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/songs/", searchRouter);
app.use("/api/v1/likedSongs/", likedRouter);
app.use("/api/v1/album/", albumRouter);
app.use("/api/v1/artist/", artistRouter);
app.use("/api/v1/genres/", genresRouter);
