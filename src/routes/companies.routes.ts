import { Router } from "express";
import {
    createCompanyController,
    deleteCompanyController,
    listCompaniesController,
    listCompanyController,
    updateCompanyController,
} from "../controllers/companies.controllers";

const router = Router();

export const companiesRoutes = () => {
    router.post("/", createCompanyController);
    router.get("/:id", listCompanyController);
    router.post("/:id", updateCompanyController);
    router.delete("/:id", deleteCompanyController);
    router.get("/", listCompaniesController);

    return router;
};
