import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/listCategories.service";
import listCategoryService from "../../services/categories/listCategory.service";

const listCategoriesController = async (req: Request, res: Response) => {
  const list = await listCategoriesService();
  return res.json(list);
};

const listCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await listCategoryService(id);
  return res.json(category);
};

export {
  listCategoriesController,
  listCategoryController,
};