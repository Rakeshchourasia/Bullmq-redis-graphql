require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const getUserFromToken = require("./src/middlewares/auth");

async function start() {
    await connectDB();

    const app = express();

    app.use(cors());

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    context: async ({ req }) => {
        const token = req.headers.authorization || "";

        console.log("HEADER:", token);

        const user = getUserFromToken(token);

        console.log("USER:", user);

        return { user };
    }

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token =
                    req.headers.authorization || "";

                console.log("HEADER:", token);

                const user =
                    getUserFromToken(token);

                console.log("USER:", user);

                return {
                    user,
                };
            },
        })
    );

    const upload =
        require("./src/middlewares/upload");

    const cloudinary =
        require("./src/config/cloudinary");

    const Video =
        require("./src/models/video");

    const videoQueue =
        require("./src/queues/videoQueue");


    app.post(
        "/upload",
        upload.single("video"),
        async (req, res) => {
            try {
                const result = await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        resource_type: "video",
                        folder: "video-platform",
                    }
                );

                const video = await Video.create({
                    title: req.file.originalname,
                    url: result.secure_url,
                    status: "UPLOADED",
                });

                await videoQueue.add(
                    "process-video",
                    {
                        videoId: video._id,
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

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

start();