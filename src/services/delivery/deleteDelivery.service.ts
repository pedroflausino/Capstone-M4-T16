import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { AppError } from "../../errors/AppError";
import { IDelivery } from "../../interfaces/delivery";
import { IDeliveryRequest } from "../../interfaces/delivery";



const deleteDeliveryService = async({id}: IDelivery) :Promise<void> => {
    const deliveryRepo = AppDataSource.getRepository(Delivery)

    const deliveryFind = await deliveryRepo.findOneBy({id})

    if(!deliveryFind){
        throw new AppError("User not found")
    }

    await deliveryRepo.delete(id)
}

export default deleteDeliveryService