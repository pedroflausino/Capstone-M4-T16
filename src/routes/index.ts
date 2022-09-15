import { Express } from "express";
import { userRoutes } from "./users.routes";
import { companiesRoutes } from "./companies.routes";
import { orderRoutes } from "./orders.routes";
import { productsRoutes } from "./products.routes";
import { categoriesRoutes } from "./categories.routes";
import { deliveryRoutes } from "./delivery.routes";
import {sessionRoutes} from "./session.routes"
import { addressRoutes } from "./address.routes";

export const appRoutes = (app: Express) => {
    app.use("/orders", orderRoutes());
    app.use("/companies", companiesRoutes());
    app.use("/users", userRoutes());
    app.use("/products", productsRoutes());
    app.use("/categories", categoriesRoutes());
    app.use("/delivery", deliveryRoutes());
    app.use("/login", sessionRoutes());
    app.use("/address", addressRoutes())
};
