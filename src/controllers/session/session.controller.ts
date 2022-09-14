import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import sessionService from "../../services/session/session.service";

const sessionController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await sessionService({ email, password });
  return res.status(200).send(token);
};

export { sessionController };
