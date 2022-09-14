import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Company } from "../../entities/company.entity";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { IProductRequest } from "../../interfaces/products/index";

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

  const findCompany = await companiesRepository.findOneBy({ id: companyId });
  if (!findCompany) {
    throw new AppError("Company not found", 400);
  }

  const findCategory = await categoriesRepository.findOneBy({ id: categoryId });
  if (!findCategory) {
    throw new AppError("Invalid category", 400);
  }

  const product = productsRepository.create();

  product.name = name;
  product.description = description;
  product.quantity = quantity;
  product.price = price;
  product.expirationDate = expirationDate;
  product.company = findCompany;
  product.category = findCategory;

  await productsRepository.save(product);
  return product;
};
