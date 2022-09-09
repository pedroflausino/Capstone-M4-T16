import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const listCompaniesService = async () => {
    const companiesRepo = AppDataSource.getRepository(Company);
    const companies = await companiesRepo.find();

    return companies;
};

export default listCompaniesService;
