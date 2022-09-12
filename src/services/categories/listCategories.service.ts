import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const listCategoriesService = async () => {
    const categoriesRepo = AppDataSource.getRepository(Category);
    const categories = await categoriesRepo.find();

    return categories;
};

export default listCategoriesService;