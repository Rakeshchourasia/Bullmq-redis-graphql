const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,

  url: String,

  publicId: String,

  thumbnail: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  publicId: {
    type: String,
    default: "",
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
}, {
  timestamps: true,
});

const Video =
  mongoose.models.Video ||
  mongoose.model("Video", videoSchema);

module.exports = Video;