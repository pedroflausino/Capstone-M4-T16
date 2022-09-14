import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";

const deleteCompanyService = async (id: string): Promise<void> => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companies = await companyRepo.find();

  const company = companies.find((e) => e.id === id);

  if (!company) {
    throw new AppError("company not found", 404);
  }
  if (!company.isActive) {
    throw new AppError("company already inactive", 409);
  }

  companyRepo.update(id, {
    isActive: false,
  });
};

export default deleteCompanyService;
