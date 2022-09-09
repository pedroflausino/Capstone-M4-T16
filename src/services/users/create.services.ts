import AppDataSource from "./../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { Addresses } from "../../entities/address.entity";
import { hash } from "bcryptjs";

 const createUserService = async ({
  name,
  email,
  password,
  address,
}: IUserRequest) => {
  const userRepo = AppDataSource.getRepository(User);
  const addressRepo = AppDataSource.getRepository(Addresses);

  const emailAlreadyInUse = await userRepo.findOneBy({ email });
  const nameAlreadyInUse = await userRepo.findOneBy({ name });
  const addressAlreadyInUse = await userRepo.findOneBy({ address });

  if (emailAlreadyInUse || nameAlreadyInUse) {
      throw new AppError("name or email already in use", 409);
  }
  if (addressAlreadyInUse) {
      throw new AppError("address already in use", 409);
  }
  if (!password) {
      throw new AppError("password is obrigatory", 409);
  }
  if (address.state.length > 2 || address.zipCode.length > 8) {
      throw new AppError("invalid address", 409);
  }

  const newAddress = addressRepo.create(address);
  await addressRepo.save(newAddress);

  const hashedPassword = await hash(password, 10);
 

  const newUser = userRepo.create({
      name,
      email,
      password: hashedPassword,
      address: newAddress,
      isActive: true,
  });
  
  await userRepo.save(newUser);

  delete newUser.password;

  return newUser;
};

export default createUserService;