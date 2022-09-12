import { Router } from "express";
import {
    createProductsController, listProductsController, updateProductController
} from "../controllers/products/products.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const router = Router();

export const productsRoutes = () => {

    router.post("/", isAdmMiddleware, ensureAuthMiddleware, createProductsController);
    router.get("/", ensureAuthMiddleware, listProductsController);
    router.patch("/:id", isAdmMiddleware, ensureAuthMiddleware, updateProductController);
    return router;
};
