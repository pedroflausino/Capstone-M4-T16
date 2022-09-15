import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const createCategoryService = async (name: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();

  const category = categories.find((e) => e.name === name);

  if (category) {
    throw new AppError("Category already exists", 402);
  }

  const newCategory = categoryRepo.create({
    name,
  });

  await categoryRepo.save(newCategory);

  return newCategory;
};

export default createCategoryService;
