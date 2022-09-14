import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

const sessionService = async ({ email, password }: IUserLogin) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  const user = users.find((e) => e.email === email);

  if (!password) {
    throw new AppError("Password is required", 401);
  }

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  if (!user.isActive) {
    throw new AppError("Invalid user", 401);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      isActive: user.isActive,
      userId: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "5h",
    }
  );
  return token;
};

export default sessionService;
