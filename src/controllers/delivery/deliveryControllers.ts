import {Request, Response} from "express"
import { IDeliveryRequest } from "../../interfaces/delivery"
import createDeliveryService from "../../services/delivery/createDelivery.service"
import deleteDeliveryService from "../../services/delivery/deleteDelivery.service"
import listDeliveryService from "../../services/delivery/listDelivery.service"


const createDeliveryController = async(req: Request, res: Response) => {
    const { name, phone, isActive }: IDeliveryRequest = req.body

    const delivery = createDeliveryService({name, phone, isActive})

    return res.json(delivery)
}

const listDeliveryController = async(req: Request, res: Response) => {
    const delivery = await listDeliveryService()
    
    return res.json(delivery)
}

const deleteDeliveryController = async(req:Request, res: Response) => {
    const { id } = req.params
    const response = await deleteDeliveryService({id})

    return res.status(200).json(response)
}
export { createDeliveryController, listDeliveryController, deleteDeliveryController}