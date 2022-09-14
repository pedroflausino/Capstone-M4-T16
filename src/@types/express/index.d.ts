import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        isAdmin: boolean;
        isActive: boolean;
      };
    }
  }
}
