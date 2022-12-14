import AppDataSource from "../../data-source";
import { IMyid } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const listUserService = async (id: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  const user = users.find((e) => e.id === id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default listUserService;
