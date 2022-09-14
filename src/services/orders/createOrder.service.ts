import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { Order_Products } from "../../entities/orderProducts.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IOrderRequest } from "../../interfaces/orders";

const createOrderService = async ({
  userId,
  status,
  delivery,
  products
}: IOrderRequest): Promise<Order> => {
  const orderRepo = AppDataSource.getRepository(Order);
  const userRepo = AppDataSource.getRepository(User);
  const orderProductsRepo = AppDataSource.getRepository(Order_Products)
  const productsRepo = AppDataSource.getRepository(Product)

  const userFind = await userRepo.findOneBy({
    id: userId,
  });

  if (!userFind) {
    throw new AppError("User not found", 404);
  }
  
  
  const order = orderRepo.create({
    user: userFind,
    status: status,
    delivery: delivery,
  });
  
  await orderRepo.save(order);

  products.forEach(async (prod)=> {

    const ArrayItem = await productsRepo.findOneBy({id:prod})

    if(ArrayItem instanceof Product){

      const orderProduct = orderProductsRepo.create({
        order,
        product: ArrayItem,
      })

      await orderProductsRepo.save(orderProduct)
    }

  })
  
  

  return order;
};

export default createOrderService;
