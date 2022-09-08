import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
} from "../controllers/orders.controllers";

const ordersRoutes = Router();

ordersRoutes.post("", createOrderController);
ordersRoutes.delete("/:id", deleteOrderController);

export default ordersRoutes;
