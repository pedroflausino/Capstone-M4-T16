import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.user.isAdm;
  const id = req.params.id;

  if (isAdm === true) {
    return next();
  }

  return res.status(403).json({ message: "You dont have authorization" });
};

export default isAdmMiddleware;
