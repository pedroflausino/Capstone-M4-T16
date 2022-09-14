import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";

export const listOneProductsService = async (id: string) => {
  const productsRepo = AppDataSource.getRepository(Product);
  const products = await productsRepo.find();

  const product = products.find((e) => e.id === id);

  if (!product) {
    throw new AppError("Invalid product id", 401);
  }

  return product;
};
