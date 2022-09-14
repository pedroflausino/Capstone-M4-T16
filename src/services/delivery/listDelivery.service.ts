import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";

const listDeliveryService = async (): Promise<Delivery[]> => {
  const deliveryRepo = AppDataSource.getRepository(Delivery);

  const deliveryList = await deliveryRepo.find();

  return deliveryList;
};

export default listDeliveryService;
