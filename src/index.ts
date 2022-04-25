import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import { Context, prisma } from "./context";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { withGoogle } from "./strategies/google";
import { __prod__ } from "./constants";

async function main() {
  const app = express();

  const httpServer = createServer(app);

  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://google-meet-backend.herokuapp.com/",
      ],
    })
  );

  app.use(
    session({
      name: "qid",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "none",
        secure: __prod__,
        domain: __prod__
          ? "https://google-meet-backend.herokuapp.com/"
          : undefined,
      },
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  await withGoogle(app, prisma);

  const schema = await buildSchema({
    validate: false,
    resolvers: [__dirname + "/resolvers/**/*.js"],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/api",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res, prisma }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    introspection: __prod__,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/api", cors: false });

  const PORT = 4000 || process.env.PORT;
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
