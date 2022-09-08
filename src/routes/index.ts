import { Express } from "express";
import { orderRoutes } from "./orders.routers";

export const appRoutes = (app: Express) => {
  app.use("/orders", orderRoutes());
};
