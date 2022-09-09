import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IOrder } from "../../interfaces/orders";
import { Order } from "../../entities/order.entity";

const deleteOrderService = async ({ id }: IOrder): Promise<void> => {
  const orderRepo = AppDataSource.getRepository(Order);

  const order = await orderRepo.findOneBy({ id });

  if (!order) {
    throw new AppError("User not found");
  }

  await orderRepo.delete(id);
};

export default deleteOrderService;
