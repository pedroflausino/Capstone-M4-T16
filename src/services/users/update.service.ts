import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";

const updateUserService = async (
  id: string,
  { name, email, password, address }: IUserUpdate
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepo.update(id, {
    name: name ? name : user.name,
    email: email ? email : user.email,
    password: password ? await hash(password, 10) : user.password,
    address: address ? address : user.address,
  });

  const updatedUser = await userRepo.findOneBy({ id });
  if (updatedUser) {
    delete updatedUser.password;
  }
  return updatedUser;
};

export default updateUserService;
