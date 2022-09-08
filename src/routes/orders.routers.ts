import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
} from "../controllers/order/orders.controllers";

const ordersRoutes = Router();

export const orderRoutes = () => {
  ordersRoutes.post("", createOrderController);
  ordersRoutes.delete("/:id", deleteOrderController);

  return orderRoutes;
};

export default ordersRoutes;
