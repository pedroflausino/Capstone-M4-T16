import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { IDelivery } from "../../interfaces/delivery";
import { IDeliveryRequest } from "../../interfaces/delivery";

const listDeliveryService = async(): Promise<Delivery[]> => {
    const deliveryRepo = AppDataSource.getRepository(Delivery)

    const deliveryList = await deliveryRepo.find()

    return deliveryList
}

export default listDeliveryService