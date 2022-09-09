import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";

const listCompanyService = async (id: string) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const company = await companyRepo.findOneBy({id});
    
    if (!company) {
        throw new AppError("company not found", 404);
    }
    
    return company;
};

export default listCompanyService;
