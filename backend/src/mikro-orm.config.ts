import { __prod__ } from "./constants";

import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { User } from "./entities/User";
import { Post } from "./entities/Post";
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  entities: [Post, User],
  dbName: "lireddit",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  type: "postgresql",
  debug: !__prod__, // Apenas quando não está em produção
} as Parameters<typeof MikroORM.init>[0];
