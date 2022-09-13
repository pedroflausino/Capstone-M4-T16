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
import { sessionController } from "../controllers/session/session.controller";

const router = Router();

export const sessionRoutes = () => {
    router.post("", sessionController);

    return router;
};