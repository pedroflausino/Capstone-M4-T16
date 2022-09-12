import AppDataSource from "../../data-source"
import { Product } from "../../entities/product.entity"

export const listOneProductsService = async (id:string) => {
const productsRepo = AppDataSource.getRepository(Product);
const product = await productsRepo.findOneBy({id});
return product;
}