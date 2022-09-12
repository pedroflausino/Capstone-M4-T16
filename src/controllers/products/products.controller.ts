import { Request, Response } from "express";
import { createProductsService } from "../../services/products/createProduct.service";
import { listProductsService } from "../../services/products/listProducts.service";
import { updateProductsService } from "../../services/products/updateProducts.service";

const createProductsController = async (req: Request, res: Response) => {
    const {name, description, quantity, price, expirationDate, companyId, categoryId} = req.body;
    const newProduct = await createProductsService({name, description, quantity, price, expirationDate, companyId, categoryId})
    return res
    .status(201)
    .json({ newProduct, message: "Product created with sucess" });
}

const listProductsController = async (req: Request, res: Response) => {
    const listProducts = await listProductsService()
    return res.status(201)
    .json(listProducts);
}

const updateProductController = async (req: Request, res: Response) => {
    const {name, description, quantity, price, expirationDate} = req.body;
    const {id} = req.params;
    const updateProducts = await updateProductsService(id, {name, description, quantity, price, expirationDate})
    return res.status(201)
    .json(updateProducts);
}

export {createProductsController, listProductsController, updateProductController}