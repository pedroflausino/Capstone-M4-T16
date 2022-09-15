import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { Order } from "../../entities/order.entity";
import { Order_Products } from "../../entities/orderProducts.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IOrderRequest } from "../../interfaces/orders";

const createOrderService = async ({
  userId,
  status,
  delivery: deliveryId,
  products
}: IOrderRequest): Promise<Order> => {
  
  const orderRepo = AppDataSource.getRepository(Order);
  const userRepo = AppDataSource.getRepository(User);
  const orderProductsRepo = AppDataSource.getRepository(Order_Products)
  const productsRepo = AppDataSource.getRepository(Product)
  const deliveryRepo = AppDataSource.getRepository(Delivery)
  const deliverys = await deliveryRepo.find()
  const delivery = deliverys.find((element)=> element.id === deliveryId)
  const users =  await userRepo.find()
  const userFind = users.find((ele)=> ele.id === userId);

  if (!userFind) {
    throw new AppError("User not found", 404);
  }
  
  if(!delivery){
    throw new AppError("Delivery not found", 404)
  }

  const order = orderRepo.create({
    user: userFind,
    status: status,
    delivery: delivery,
  });
  const d = new Date()
  await orderRepo.save(order);
  products.forEach(async (prod)=> {
    const productsFromRepo = await productsRepo.find()
    const ArrayItem = productsFromRepo.find((element)=> element.id === prod)

    if(ArrayItem instanceof Product){

      const orderProduct = orderProductsRepo.create({
        order,
        product: ArrayItem,
        date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
        hour: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      })

      await orderProductsRepo.save(orderProduct)
    }

  })
  
  

  return order;
};

export default createOrderService;