import { Router } from "express";
import { sessionController } from "../controllers/session/session.controller";

const router = Router();

export const sessionRoutes = () => {
    router.post("", sessionController);

    return router;
};