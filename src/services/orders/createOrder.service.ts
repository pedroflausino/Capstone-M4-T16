import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IOrderRequest } from "../../interfaces/orders";

const createOrderService = async ({
  userId,
  status,
  delivery,
}: IOrderRequest): Promise<Order> => {
  const orderRepo = AppDataSource.getRepository(Order);
  const userRepo = AppDataSource.getRepository(User);

  const userFind = await userRepo.findOneBy({
    id: userId,
  });

  if (!userFind) {
    throw new AppError("User not found", 404);
  }

  const order = orderRepo.create({
    user: userFind,
    status: status,
    /* delivery: delivery, */
  });

  await orderRepo.save(order);

  return order;
};

export default createOrderService;
