const { Queue } = require("bullmq");

const connection = require("../config/redis");

const videoQueue = new Queue("video-transcoding", {
  connection,
});

module.exports = videoQueue;