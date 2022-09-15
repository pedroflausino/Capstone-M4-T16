import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryController,
} from "../controllers/category/category.controller";

const router = Router();

export const categoriesRoutes = () => {
  router.get("/", listCategoriesController);
  router.get("/:id/products", listCategoryController);
  router.post("/", createCategoryController);

  return router;
};
