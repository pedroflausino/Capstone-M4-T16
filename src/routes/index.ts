import { Express } from "express";
import { userRoutes } from "./users.routes";
import { companiesRoutes } from "./companies.routes";
import { orderRoutes } from "./orders.routes";

export const appRoutes = (app: Express) => {
  app.use("/orders", orderRoutes());
  app.use("/companies", companiesRoutes())
  app.use("/users", userRoutes());
};

