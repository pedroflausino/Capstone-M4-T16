import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { createProductsService } from "../../services/products/createProduct.service";
import { deleteProductService } from "../../services/products/deleteProducts.service";
import { listOneProductsService } from "../../services/products/listOneProduct.service";
import { listProductsService } from "../../services/products/listProducts.service";
import { updateProductsService } from "../../services/products/updateProducts.service";

const createProductsController = async (req: Request, res: Response) => {
  const {
    name,
    description,
    quantity,
    price,
    expirationDate,
    companyId,
    categoryId,
  } = req.body;
  if (
    !name ||
    !description ||
    !quantity ||
    !price ||
    !expirationDate ||
    !companyId ||
    !categoryId
  ) {
    return res.status(404).send({ message: "Missing body content" });
  }
  const newProduct = await createProductsService({
    name,
    description,
    quantity,
    price,
    expirationDate,
    companyId,
    categoryId,
  });
  return res
    .status(201)
    .json({ newProduct, message: "Product created with sucess" });
};

const listProductsController = async (req: Request, res: Response) => {
  const listProducts = await listProductsService();
  return res.status(200).json(listProducts);
};

const listOneProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = listOneProductsService(id);
  return res.status(200).json(product);
};

const updateProductController = async (req: Request, res: Response) => {
  const { name, description, quantity, price, expirationDate } = req.body;
  const { id } = req.params;
  const updateProducts = await updateProductsService(id, {
    name,
    description,
    quantity,
    price,
    expirationDate,
  });
  return res.status(201).json(updateProducts);
};

const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteProduct = await deleteProductService(id);
  return res.status(200).json(deleteProduct);
};

export {
  createProductsController,
  listProductsController,
  listOneProductController,
  updateProductController,
  deleteProductController,
};
