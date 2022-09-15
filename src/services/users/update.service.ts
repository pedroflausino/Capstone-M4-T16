import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";

const updateUserService = async (
  id: string,
  { name, email, password }: IUserUpdate
) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  const user = users.find((e) => e.id === id);

  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (name) {
    await userRepo.update(user.id, { name });
  }

  if (email) {
    await userRepo.update(user.id, { email });
  }

  if (password) {
    await userRepo.update(user.id, { password: await hash(password, 10) });
  }

  if (email) {
    await userRepo.update(user.id, { email });
  }

  const d: Date = new Date();
  const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  await userRepo.update(user.id, { updatedAt: date });

  const newUsers = await userRepo.find();

  const newUser = newUsers.find((e) => e.id === id);

  return newUser;
};

export default updateUserService;
