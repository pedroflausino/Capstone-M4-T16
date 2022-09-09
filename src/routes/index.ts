import { Express } from "express";
import { orderRoutes } from "./orders.routers";
import { userRoutes } from "./users.routes";

export const appRoutes = (app: Express) => {
    app.use("/orders", orderRoutes());

    app.use("/users", userRoutes());
};
