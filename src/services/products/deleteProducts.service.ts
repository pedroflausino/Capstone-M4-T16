import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";

export const deleteProductService = async (id: string): Promise<void> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const products = await productsRepository.find();

  const product = products.find((e) => e.id === id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  await productsRepository
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where("id = :id", { id })
    .execute();
};
