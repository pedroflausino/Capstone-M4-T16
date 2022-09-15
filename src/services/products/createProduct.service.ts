import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Company } from "../../entities/company.entity";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { IProduct, IProductRequest } from "../../interfaces/products/index";

export const createProductsService = async ({
  name,
  description,
  quantity,
  price,
  expirationDate,
  companyId,
  categoryId,
}: IProductRequest) => {
  const productsRepository = AppDataSource.getRepository(Product);
  const companiesRepository = AppDataSource.getRepository(Company);
  const categoriesRepository = AppDataSource.getRepository(Category);

  const companies = await companiesRepository.find();
  const company = companies.find((e) => e.id === companyId);

  if (!company) {
    throw new AppError("Company not found", 400);
  }

  const categories = await categoriesRepository.find();
  const category = categories.find((e) => e.id === categoryId);

  if (!category) {
    throw new AppError("Invalid category", 400);
  }

  const products = await productsRepository.find();
  const product = products.find(
    (e) => e.name === name && e.description === description
  );

  if (product) {
    throw new AppError("Product already exist", 401);
  }

  const newProduct: IProduct = productsRepository.create({
    name,
    description,
    quantity,
    price,
    expirationDate,
    company: company,
    category: category,
  });

  await productsRepository.save(newProduct);

  return newProduct;
};
