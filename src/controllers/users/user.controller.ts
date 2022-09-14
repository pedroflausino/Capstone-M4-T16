import createUserService from "./../../services/users/create.services";
import listUserService from "../../services/users/list.service";
import listUsersService from "../../services/users/list.users.services";
import updateUserService from "../../services/users/update.service";
import softDeleteUserService from "../../services/users/delete.service";
import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, address, isAdm } = req.body;
  const newUser = await createUserService({
    name,
    email,
    password,
    address,
    isAdm,
  });
  return res.status(201).json(newUser);
};

const listUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await listUserService(id);

  res.status(200).json(user);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, address } = req.body;
  const company = await updateUserService(id, {
    name,
    email,
    password,
    address,
  });

  res.status(201).json(company);
};

const softDeleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isDeleted = await softDeleteUserService(id);

  return res.status(200);
};

export {
  createUserController,
  listUserController,
  listUsersController,
  updateUserController,
  softDeleteUserController,
};
