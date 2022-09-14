import { Router } from "express";
import {
  createProductsController,
  deleteProductController,
  listOneProductController,
  listProductsController,
  updateProductController,
} from "../controllers/products/products.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router();

export const productsRoutes = () => {
  router.post("", ensureAuthMiddleware, createProductsController);
  router.get("/", ensureAuthMiddleware, listProductsController);
  router.get("/:id", ensureAuthMiddleware, listOneProductController);
  router.patch("/:id", ensureAuthMiddleware, updateProductController);
  router.delete("/:id", ensureAuthMiddleware, deleteProductController);
  return router;
};
