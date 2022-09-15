import { Request, Response } from "express";
import createCategoryService from "../../services/categories/createCategory.service";
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

const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  const newCategory = await createCategoryService(name);

  return res.status(201).send(newCategory);
};

export { listCategoriesController, listCategoryController, createCategoryController };
