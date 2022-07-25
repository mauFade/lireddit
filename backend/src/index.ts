require("dotenv").config();

import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import ormConfig from "./mikro-orm.config";

import express from "express";
import cors from "cors";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(ormConfig);

  await orm.getMigrator().up();

  const emFork = orm.em.fork();

  const app = express();
  const PORT = 4000;

  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 anos
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // Cookie só funciona em https
      },
      secret: "redishashtokensecret",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: emFork, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.info(`App started at port: ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
