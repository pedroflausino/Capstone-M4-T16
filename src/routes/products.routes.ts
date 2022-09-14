import { Router } from "express";
import {
    createProductsController, deleteProductController, listOneProductController, listProductsController, updateProductController
} from "../controllers/products/products.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const router = Router();

export const productsRoutes = () => {

    router.post("", isAdmMiddleware, ensureAuthMiddleware, createProductsController);
    router.get("/", ensureAuthMiddleware, listProductsController);
    router.get("/:id", ensureAuthMiddleware, listOneProductController); 
    router.patch("/:id", isAdmMiddleware, ensureAuthMiddleware, updateProductController);
    router.delete("/:id", isAdmMiddleware, ensureAuthMiddleware, deleteProductController);
    return router;
};
