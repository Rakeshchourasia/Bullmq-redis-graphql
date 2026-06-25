require("dotenv").config();

const { Worker } = require("bullmq");
const connection = require("../config/redis");
const connectDB = require("../config/db");
const Video = require("../models/video");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);
async function startWorker() {
  await connectDB();

  console.log("Worker MongoDB Connected");

  const worker = new Worker(
    "video-transcoding",
    async (job) => {
      const { videoId } = job.data;

      console.log(`Processing video with ID: ${videoId}`);

      await Video.findByIdAndUpdate(videoId, {
        status: "PROCESSING",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      );

      await Video.findByIdAndUpdate(videoId, {
        status: "COMPLETED",
      });

      console.log(`Completed video ${videoId}`);
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.log(`Job failed: ${err.message}`);
  });
}

startWorker();