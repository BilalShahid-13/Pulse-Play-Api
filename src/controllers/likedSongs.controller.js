import NodeCache from "node-cache";
import { Liked } from "../models/Liked.model.js";
const nodeCache = new NodeCache();
const saveLikedSongs = async (req, res) => {
  const { songId, songName, artist, albumId, songImageUrl, duration, songUrl } =
    req.body;

  if (
    !songId
    // !songName ||
    // !artist ||
    // !albumId ||
    // !songImageUrl ||
    // !duration ||
    // !songUrl
  ) {
    return res.status(400).send({ message: "all fields are required" });
  }
  try {
    const likedSong = await Liked.create({
      userId: req.user.id,
      songId,
      // songName,
      // artist,
      // albumId,
      // songImgURL: songImageUrl,
      // duration,
      // songURL: songUrl,
    });

    nodeCache.set("likedSongs", likedSong);
    return res.status(201).json({
      message: "song saved successfully",
      data: likedSong,
    });
  } catch (error) {
    console.error("search error", error);
  }
};

const viewLikedSongs = async (req, res) => {
  if (nodeCache.has("likedSongs")) {
    return res.status(200).json({
      message: "data searched successfully",
      data: nodeCache.get("likedSongs"),
    });
  }
  try {
    const likedSongs = await Liked.find({ userId: req.user.id }).populate({
      path: "userId",
      select: "fullname email",
    });
    nodeCache.set("likedSongs", likedSongs);
    return res.status(200).json({
      message: "search liked song successfully",
      data: likedSongs,
    });
  } catch (error) {
    console.error("search fetch error", error);
  }
};

export { saveLikedSongs, viewLikedSongs };
