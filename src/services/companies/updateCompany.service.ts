import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";

const updateCompanyService = async (id: string, name: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companies = await companyRepo.find();

  const company = companies.find((e) => e.id === id);

  if (!company) {
    throw new AppError("Company not found", 404);
  }

  if (company.name === name) {
    throw new AppError("Equal name", 401);
  }

  await companyRepo.update(id, {
    name: name,
  });

  const d: Date = new Date();
  const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  await companyRepo.update(id, { updatedAt: date });

  const updateCompanies = await companyRepo.find();

  const updatedCompany = updateCompanies.find((e) => e.id === id);

  return updatedCompany;
};

export default updateCompanyService;
