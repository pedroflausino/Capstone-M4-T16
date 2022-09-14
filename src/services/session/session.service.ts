import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

const sessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  if (!user.isActive) {
    throw new AppError("Invalid user", 401);
  }
  if (!user.password) {
    throw new AppError("Internal Error", 500);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Invalid email or password", 401);
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
