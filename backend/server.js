require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const getUserFromToken = require("./src/middlewares/auth");

const upload = require("./src/middlewares/upload");
const cloudinary = require("./src/config/cloudinary");

const Video = require("./src/models/video");
const videoQueue = require("./src/queues/videoQueue");

const {
  createBullBoard,
  BullMQAdapter,
  serverAdapter,
} = require("./src/config/bullBoard");

async function start() {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token =
          req.headers.authorization || "";

        console.log("TOKEN:", token);

        const user =
          getUserFromToken(token);

        console.log("USER:", user);

        return { user };
      },
    })
  );

  // Upload Video
  app.post(
    "/upload",
    upload.single("video"),
    async (req, res) => {
      try {
        const token =
          req.headers.authorization || "";

        const user =
          getUserFromToken(token);

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }

        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "No video uploaded",
          });
        }

        const result =
          await cloudinary.uploader.upload(
            req.file.path,
            {
              resource_type: "video",
              folder: "video-platform",
            }
          );

        const video =
          await Video.create({
            title:
              req.file.originalname,

            url:
              result.secure_url,

            publicId:
              result.public_id,

            owner:
              user.id,

            status:
              "UPLOADED",
          });

        await videoQueue.add(
          "process-video",
          {
            videoId:
              video._id,
          }
        );

        res.status(200).json({
          success: true,
          video,
        });

      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  );

  createBullBoard({
    queues: [
      new BullMQAdapter(videoQueue),
    ],
    serverAdapter,
  });

  app.use(
    "/admin/queues",
    serverAdapter.getRouter()
  );

  app.listen(
    process.env.PORT || 5000,
    () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    }
  );
}

start();