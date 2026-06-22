const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,

    url: String,

    status: {
      type: String,
      enum: [
        "UPLOADED",
        "PROCESSING",
        "COMPLETED"
      ],
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      default: "UPLOADED"
    },

    thumbnail: String
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Video",
  videoSchema
);