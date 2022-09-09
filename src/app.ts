
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import usersRoutes from "./routes/users.routes";

import { appRoutes } from "./routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

appRoutes(app);

app.use(handleErrorMiddleware);


export default app;
