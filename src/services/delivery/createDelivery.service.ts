import AppDataSource from "../../data-source";
import { Delivery } from "../../entities/delivery.entity";
import { AppError } from "../../errors/AppError";
import { IDeliveryRequest } from "../../interfaces/delivery";

const createDeliveryService = async({name, phone, isActive}:IDeliveryRequest) : Promise <Delivery> => {

 const deliveryRepo = AppDataSource.getRepository(Delivery);

 const deliveryAreadyExists = await deliveryRepo.findOneBy({ phone });

 if(deliveryAreadyExists){
     throw new AppError("User aready exists", 400)
 }

 const deliveryCreate = deliveryRepo.create({
     name: name,
     phone: phone,
     isActive: isActive,
 })

 await deliveryRepo.save(deliveryCreate)

 return deliveryCreate

}

export default createDeliveryService