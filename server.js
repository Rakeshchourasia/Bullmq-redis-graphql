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
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

start();