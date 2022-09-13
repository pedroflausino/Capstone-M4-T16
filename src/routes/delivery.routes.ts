import { Router } from "express";
import { listDeliveryController, createDeliveryController, deleteDeliveryController} from "../controllers/delivery/deliveryControllers";


const deliveriesRoutes = Router();

export const deliveryRoutes = () => {
  deliveriesRoutes.post("", createDeliveryController);
  deliveriesRoutes.delete("/:id", deleteDeliveryController);
  deliveriesRoutes.get("", listDeliveryController)

  return deliveryRoutes;
};

export default deliveriesRoutes;