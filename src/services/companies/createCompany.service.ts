import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";
import { ICompanyRequest, ICompany } from "../../interfaces/companies";
import { User } from "../../entities/user.entity";

const createCompanyService = async (
  userId: string,
  { name, address }: ICompanyRequest
) => {
  const userRepo = AppDataSource.getRepository(User);
  const companyRepo = AppDataSource.getRepository(Company);
  const addressRepo = AppDataSource.getRepository(Addresses);

  const users = await userRepo.find();
  const companies = await companyRepo.find();
  const addresses = await addressRepo.find();

  const nameAlreadyInUse = companies.find((e) => e.name === name);
  const addressAlreadyInUse = addresses.find(
    (e) => e.district === address.district && e.zipCode === address.zipCode
  );
  const user = users.find((e) => e.id === userId);

  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (nameAlreadyInUse) {
    throw new AppError("name already in use", 409);
  }
  if (addressAlreadyInUse) {
    throw new AppError("address already in use", 409);
  }

  if (address.state.length > 2 || address.zipCode.length > 8) {
    throw new AppError("invalid address", 409);
  }

  const newAddress = addressRepo.create(address);
  await addressRepo.save(newAddress);

  const d: Date = new Date();
  const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  const newCompany: ICompany = companyRepo.create({
    name,
    address: newAddress,
    isActive: true,
    isOpen: false,
    createdAt: date,
    updatedAt: date,
    user: user,
  });

  await companyRepo.save(newCompany);

  return newCompany;
};

export default createCompanyService;
