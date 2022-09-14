import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";

const listOrdersService = async () => {
    const orderRepo = AppDataSource.getRepository(Order);
    return await orderRepo.find();
};

export default listOrdersService;
