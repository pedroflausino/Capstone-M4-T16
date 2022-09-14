import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { Order_Products } from "../../entities/orderProducts.entity";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";

const listProductsFromOrderService = async (id: string) => {
    const orderRepo = AppDataSource.getRepository(Order);
    const order = await orderRepo.findOneBy({ id });
    if (!order) {
        throw new AppError("order not found", 404);
    }
    let products: Product[] = [];
    order.orderProducts.forEach((orderProd) => {
        products.push(orderProd.product);
    });
    return products;
};

export default listProductsFromOrderService;
