import { Express } from "express";
import ordersRoutes from "./orders.routers";

export const appRoutes = (app: Express) => {
    app.use("/orders", ordersRoutes)
}