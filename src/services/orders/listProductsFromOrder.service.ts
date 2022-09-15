import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../errors/AppError";

const listProductsFromOrderService = async (id: string) => {
    const orderRepo = AppDataSource.getRepository(Order);
    const orders = await orderRepo.find();
    const order = orders.find((element)=> element.id == id)
    if (!order) {
        throw new AppError("order not found", 404);
    }
   
    return order.orderProducts;
};

export default listProductsFromOrderService;
