import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  listOrdersController,
  listProductsFromOrderController,
} from "../controllers/order/orders.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const ordersRoutes = Router();

export const orderRoutes = () => {
  ordersRoutes.post("", createOrderController);
  ordersRoutes.delete("/:id", deleteOrderController);
  ordersRoutes.get("",ensureAuthMiddleware, isAdmMiddleware, listOrdersController)
  ordersRoutes.get("/:id/products", listProductsFromOrderController)

  return orderRoutes;
};

export default ordersRoutes;
