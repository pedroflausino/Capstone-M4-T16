import { Router } from "express";
import { listCategoriesController, 
         listCategoryController } from "../controllers/category/category.controller";

const router = Router();

export const categoriesRoutes = () => {
    router.get("/", listCategoriesController);
    router.get("/:id/products", listCategoryController);

    return router;
};
