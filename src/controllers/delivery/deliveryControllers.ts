import { Request, Response } from "express";
import { IDeliveryRequest } from "../../interfaces/delivery";
import createDeliveryService from "../../services/delivery/createDelivery.service";
import deleteDeliveryService from "../../services/delivery/deleteDelivery.service";
import listDeliveryService from "../../services/delivery/listDelivery.service";

const createDeliveryController = async (req: Request, res: Response) => {
  const { name, phone }: IDeliveryRequest = req.body;
  if (!name || !phone) {
    return res.status(400).send({ message: "Missing body infomations" });
  }

  const delivery = await createDeliveryService({ name, phone });

  return res.status(201).json(delivery);
};

const listDeliveryController = async (req: Request, res: Response) => {
  const delivery = await listDeliveryService();

  return res.status(200).send(delivery);
};

const deleteDeliveryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteDeliveryService(id);

  return res.status(200).json(response);
};
export {
  createDeliveryController,
  listDeliveryController,
  deleteDeliveryController,
};
