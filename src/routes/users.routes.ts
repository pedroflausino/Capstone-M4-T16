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

const router = Router();

export const userRoutes = () => {
    router.post("", validationMiddleware(newUserSchema), createUserController);

    router.get("/:id", ensureAuthMiddleware, listUserController);

    router.get("", ensureAuthMiddleware, listUsersController);

    router.patch("/:id", updateUserController);

    router.delete("/:id", ensureAuthMiddleware, softDeleteUserController);

    return router;
};

