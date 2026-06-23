import { NODE_ENV, port } from "../config/config.service.js";
import { connectionDB } from "./DB/connection.db.js";

import {
  authRouter,
  userRouter,
  categoryRouter,
  productRouter,
} from "./modules/index.js";
import seederRouter from "./seeder/seeder.routes.js";
import express from "express";
import { subCategoryRouter } from "./modules/subCategory/index.js";
import { connectRedis } from "./redisConfig/redis.js";

function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());
  //!connect DB
  connectionDB();
  connectRedis();
  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/categories", categoryRouter);
  app.use("/subcategories", subCategoryRouter);
  app.use("/products", productRouter);
  // ~seeder
  app.use("/seeder", seederRouter);

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
