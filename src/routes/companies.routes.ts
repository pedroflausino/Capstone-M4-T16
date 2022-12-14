import { Router } from "express";
import {
  changeStatusCompanyController,
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
  router.patch("/:id", ensureAuthMiddleware, updateCompanyController);
  router.delete("/:id", ensureAuthMiddleware, deleteCompanyController);
  router.patch("/changeStatus/:id", ensureAuthMiddleware, changeStatusCompanyController);
  router.get("", listCompaniesController);

  return router;
};
