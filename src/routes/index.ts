import { Express } from "express";
import { userRoutes } from "./users.routes";
import { companiesRoutes } from "./companies.routes";
import { orderRoutes } from "./orders.routes";
import { productsRoutes } from "./products.routes";
import { categoriesRoutes } from "./categories.routes";

export const appRoutes = (app: Express) => {
    app.use("/orders", orderRoutes());
    app.use("/companies", companiesRoutes());
    app.use("/users", userRoutes());
    app.use("/products", productsRoutes());
    app.use("/categories", categoriesRoutes());
};
