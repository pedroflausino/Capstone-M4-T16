import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { AppError } from "../../errors/AppError";
import { IDeliveryRequest } from "../../interfaces/delivery";

const createDeliveryService = async ({
  name,
  phone,
}: IDeliveryRequest): Promise<Delivery> => {
  if (!name || !phone) {
    throw new AppError("Missing body informations", 400);
  }

  const deliveryRepo = AppDataSource.getRepository(Delivery);

  const deliveries = await deliveryRepo.find();

  const delivery = deliveries.find((e) => e.phone === phone);

  if (delivery) {
    throw new AppError("User aready exists", 400);
  }

  const deliveryCreate = deliveryRepo.create({
    name: name,
    phone: phone,
    isActive: false,
  });

  await deliveryRepo.save(deliveryCreate);

  return deliveryCreate;
};

export default createDeliveryService;
