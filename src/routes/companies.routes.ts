import { Router } from "express";
import {
  createCompanyController,
  deleteCompanyController,
  listCompaniesController,
  listCompanyController,
  updateCompanyController,
} from "../controllers/company/companies.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router();

export const companiesRoutes = () => {
  router.post("", ensureAuthMiddleware, createCompanyController);
  router.get("/:id", ensureAuthMiddleware, listCompanyController);
  router.post("/:id", updateCompanyController);
  router.delete("/:id", ensureAuthMiddleware, deleteCompanyController);
  router.get("", listCompaniesController);

  return router;
};
