import { Express } from "express";
import { companiesRoutes } from "./companies.routes";
import { orderRoutes } from "./orders.routers";

export const appRoutes = (app: Express) => {
  app.use("/orders", orderRoutes());
  app.use("/companies", companiesRoutes())
};

