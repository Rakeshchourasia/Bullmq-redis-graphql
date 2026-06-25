const Video = require("../models/video");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const videoQueue = require("../queues/videoQueue");

const resolvers = {
  Query: {
    videos: async () => {
      return await Video.find();
    },

    myVideos: async (_, __, context) => {
      console.log("MYVIDEOS CONTEXT:", context);

      if (!context.user) {
        throw new Error("Unauthorized");
      }

      const videos = await Video.find({
        owner: context.user.id,
      });

      return videos;
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        token,
        user,
      };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        token,
        user,
      };
    },

    uploadVideo: async (
      _,
      { title },
      context
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      const video =
        await Video.create({
          title,
          owner: context.user.id,
          status: "UPLOADED",
        });

      await videoQueue.add(
        "process-video",
        {
          videoId: video._id,
        }
      );

      return video;
    },
  },
};

module.exports = resolvers;