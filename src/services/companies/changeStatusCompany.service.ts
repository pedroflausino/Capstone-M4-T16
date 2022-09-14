import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const changeStatusCompanyService = async (
  userId: string,
  companyId: string
): Promise<void> => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companies = await companyRepo.find();
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  const company = companies.find((e) => e.id === companyId);
  const user = users.find((e) => e.id === userId);

  if (!company) {
    throw new AppError("Company not found", 404);
  }

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (company.user.id !== user.id) {
    throw new AppError("You need to be the owner to change status", 401);
  }

  const status = !company.isOpen;

  await companyRepo.update(companyId, { isOpen: status });
};

export default changeStatusCompanyService;
