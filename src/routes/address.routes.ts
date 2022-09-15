import { Router } from "express";
import { updateAddressController } from "../controllers/address/address.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const router = Router();

export const addressRoutes = () => {
  router.patch(
    "/:id",
    ensureAuthMiddleware,
    isAdmMiddleware,
    updateAddressController
  );
  return router;
};
