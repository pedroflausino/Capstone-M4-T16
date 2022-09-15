import { Router } from "express";
import { updateAddressController } from "../controllers/address/address.controller";

const router = Router();

export const addressRoutes = () => {
  router.post("/:id", updateAddressController);
  return router;
};
