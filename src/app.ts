import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import ordersRoutes from "./routes/orders.routers";

const app = express();
app.use(express.json());

app.use("/orders", ordersRoutes);

app.use(handleErrorMiddleware);

export default app;
