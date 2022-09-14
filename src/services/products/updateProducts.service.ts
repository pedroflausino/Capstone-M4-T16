import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { IProductUpdate } from "../../interfaces/products";

export const updateProductsService = async (
  id: string,
  {
    name,
    description,
    quantity,
    price,
    expirationDate,
    categoryId,
  }: IProductUpdate
) => {
  const productsRepository = AppDataSource.getRepository(Product);
  const categoryRepo = AppDataSource.getRepository(Category);

  const products = await productsRepository.find();
  const categories = await categoryRepo.find();

  const product = products.find((e) => e.id === id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (name) {
    await productsRepository.update(id, { name });
  }

  if (description) {
    await productsRepository.update(id, { description });
  }

  if (quantity) {
    await productsRepository.update(id, { quantity });
  }

  if (price) {
    await productsRepository.update(id, { price });
  }

  if (expirationDate) {
    await productsRepository.update(id, { expirationDate });
  }

  if (categoryId) {
    const category = categories.find((e) => e.id === categoryId);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    await productsRepository.update(id, { category });
  }

  const updatedProduct = await productsRepository.findOneBy({ id: id });

  return updatedProduct;
};
