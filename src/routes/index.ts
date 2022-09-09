import { Express } from "express";
import { companiesRoutes } from "./companies.routes";
import ordersRoutes from "./orders.routers";

export const appRoutes = (app: Express) => {
    app.use("/orders", ordersRoutes)
    app.use("/companies", companiesRoutes())
}