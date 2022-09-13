import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) throw new AppError("Invalid token", 401);

  token = token?.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) throw new AppError("Invalid token", 401);

      req.user = {
        isActive: decoded.isActive,
        userId: decoded.userId,
        isAdm: decoded.isAdm
      };
    }
  );
  next();
};

export default ensureAuthMiddleware;
