import { Router } from "express";
import {
  createUserController,
  listUserController,
  listUsersController,
  updateUserController,
  softDeleteUserController,
} from "../controllers/users/user.controller";

import { validationMiddleware } from "../middlewares/validationSchema.middleware";
import { newUserSchema } from "../schemas/newUser.schema";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const usersRoutes = Router();

usersRoutes.post("", validationMiddleware(newUserSchema), createUserController);

usersRoutes.get("/:id", ensureAuthMiddleware, listUserController);

usersRoutes.get("", ensureAuthMiddleware, listUsersController);

usersRoutes.patch("/:id", updateUserController);

usersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  softDeleteUserController
);

export default usersRoutes;