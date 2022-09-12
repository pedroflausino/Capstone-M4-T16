import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { IProductUpdate } from "../../interfaces/products";

export const updateProductsService = async (id: string, {name, description, quantity, price, expirationDate, companyId, categoryId}:IProductUpdate) => {
    
const productsRepository = AppDataSource.getRepository(Product);
const product = await productsRepository.findOneBy({id: id});
if(!product){ throw new AppError("Product not found", 404)};

await productsRepository.update(id, {
    name: name ? name : product.name,
    description: description? description : product.description,
    quantity: quantity? quantity : product.quantity,
    price: price? price : product.price,
    expirationDate: expirationDate? expirationDate : product.expirationDate,
});

const updatedProduct = await productsRepository.findOneBy({id:id});

return updatedProduct;

}


