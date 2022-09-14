import { Request, Response } from "express";
import { IOrderRequest } from "../../interfaces/orders";
import createOrderService from "../../services/orders/createOrder.service";
import deleteOrderService from "../../services/orders/deleteOrder.service";
import listOrdersService from "../../services/orders/listOrders.service";
import listProductsFromOrderService from "../../services/orders/listProductsFromOrder.service";

const createOrderController = async (req: Request, res: Response) => {
  const { status, delivery, products }: IOrderRequest = req.body;
  const userId = req.user.userId;
  const response = await createOrderService({ userId, status, delivery, products });
  return res
    .status(201)
    .json({ response, message: "Order created with sucess" });
};

const deleteOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteOrderService({ id });
  return res
    .status(200)
    .json({ response, message: "Order deleted with sucess" });
};

const listOrdersController = async( req: Request, res: Response) =>{
  const orders = await listOrdersService()
  return res.status(200).json(orders)
}

const listProductsFromOrderController = async( req: Request, res: Response) =>{
  
  const {id} = req.params
  const products = await listProductsFromOrderService(id)
  return res.status(200).json(products)
}

export { createOrderController, deleteOrderController, listOrdersController,listProductsFromOrderController  };
