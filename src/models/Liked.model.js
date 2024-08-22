import mongoose from "mongoose";

const likedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    songId: {
      type: String,
      required: [true, "songId is required"],
    },
    songName: {
      type: String,
      required: [true, "songName is required"],
    },
    artist: {
      type: [
        {
          type: String,
        },
      ],
      // type: String,
      required: [true, "artist is required"],
    },
    albumId: {
      type: Number,
      required: [true, "albumId is required"],
    },
    songImgURL: {
      type: String,
      required: [true, "songImgURL is required"],
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
    },
    songURL: {
      type: String,
      required: [true, "songURL is required"],
    },
  },
  { timestamps: true }
);

export const Liked = mongoose.model("Liked", likedSchema);
