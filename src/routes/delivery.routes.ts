import { Router } from "express";
import {
  listDeliveryController,
  createDeliveryController,
  deleteDeliveryController,
} from "../controllers/delivery/deliveryControllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router();

export const deliveryRoutes = () => {
  router.post("", ensureAuthMiddleware, createDeliveryController);
  router.delete("/:id", deleteDeliveryController);
  router.get("", listDeliveryController);

  return router;
};
