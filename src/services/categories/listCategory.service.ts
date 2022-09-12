import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const listCategoryService = async (id: string) => {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({id});
    
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    
    return category;
};

export default listCategoryService;


