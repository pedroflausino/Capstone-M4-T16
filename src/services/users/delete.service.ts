import AppDataSource from "./../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";

const softDeleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const currentUser = users.find((e) => e.id === id);

  if (!currentUser) {
    throw new AppError("User not found", 404);
  }
  if (currentUser.isActive === false) {
    throw new AppError("User already excluded", 409);
  }

  await userRepository.update(currentUser!.id, { isActive: false });
};

export default softDeleteUserService;
