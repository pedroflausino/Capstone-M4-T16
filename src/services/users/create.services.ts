import AppDataSource from "./../../data-source";
import { AppError } from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { Addresses } from "../../entities/address.entity";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

const createUserService = async ({
  name,
  email,
  password,
  address,
  isAdm,
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

  const d: Date = new Date();
  const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  const newUser: IUser = userRepo.create({
    id: uuid(),
    name,
    email,
    password: hashedPassword,
    address: newAddress,
    isActive: true,
    isAdm,
    createdAt: date,
    updatedAt: date,
  });

  await userRepo.save(newUser);

  return newUser;
};

export default createUserService;
