import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { AppError } from "../../errors/AppError";

const deleteDeliveryService = async (id: string): Promise<void> => {
  const deliveryRepo = AppDataSource.getRepository(Delivery);

  const deliveries = await deliveryRepo.find();

  const delivery = deliveries.find((e) => e.id === id);

  if (!delivery) {
    throw new AppError("User not found");
  }

  await deliveryRepo
    .createQueryBuilder()
    .delete()
    .from(Delivery)
    .where("id = :id", { id })
    .execute();
};

export default deleteDeliveryService;
