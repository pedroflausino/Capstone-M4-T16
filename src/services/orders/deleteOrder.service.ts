import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IOrder } from "../../interfaces/orders";
import { Order } from "../../entities/order.entity";
import { Order_Products } from "../../entities/orderProducts.entity";

const deleteOrderService = async ({ id }: IOrder): Promise<void> => {
  const orderRepo = AppDataSource.getRepository(Order);
  const orderProdsRepo = AppDataSource.getRepository(Order_Products)
 
  const orders = await orderRepo.find();
  const order = orders.find((element)=> element.id == id)
  
  if (!order) {
    throw new AppError("order not found", 404);
  }

  order.orderProducts.forEach(async (element) => {
    await orderProdsRepo.delete(element)
    
  });
  await orderRepo.delete(id);
};

export default deleteOrderService;
