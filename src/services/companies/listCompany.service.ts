import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";

const listCompanyService = async (id: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companies = await companyRepo.find();

  const company = companies.find((e) => e.id === id);

  if (!company) {
    throw new AppError("company not found", 404);
  }

  return company;
};

export default listCompanyService;
