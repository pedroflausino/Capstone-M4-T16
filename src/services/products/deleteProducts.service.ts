import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";

export const deleteProductService = async (id: string) => {
    const productsRepository = AppDataSource.getRepository(Product);
    const selectedProduct = await productsRepository.findOneBy({id});
    if(!selectedProduct){ throw new AppError("Product not found", 404)};

    await productsRepository.delete({id: id});
    return selectedProduct;

}