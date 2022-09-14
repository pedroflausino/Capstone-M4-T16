import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";

export const listProductsService = async () => {
  const productsRepo = AppDataSource.getRepository(Product);
  const productList = await productsRepo.find();
  return productList;
};
