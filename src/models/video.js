const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: [
        "UPLOADED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
      ],
      default: "UPLOADED",
    },

    thumbnail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Video =
  mongoose.models.Video ||
  mongoose.model("Video", videoSchema);

module.exports = Video;