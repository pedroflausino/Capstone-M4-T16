import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  listOrdersController,
  listProductsFromOrderController,
} from "../controllers/order/orders.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const router = Router();

export const orderRoutes = () => {
  router.post("",ensureAuthMiddleware, isAdmMiddleware ,createOrderController);
  router.delete("/:id", deleteOrderController);
  router.get("",ensureAuthMiddleware, isAdmMiddleware, listOrdersController)
  router.get("/:id/products", listProductsFromOrderController)

  return router;
};


