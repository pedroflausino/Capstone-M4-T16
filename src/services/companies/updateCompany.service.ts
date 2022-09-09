import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";
import { ICompanyUpdateRequest } from "../../interfaces/companies";


const updateCompanyService = async (
    id: string,
    { name, address }: ICompanyUpdateRequest
) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const company = await companyRepo.findOneBy({ id });

    if (!company) {
        throw new AppError("company not found", 404);
    }

    await companyRepo.update(id, {
        name: name ? name : company.name,
        address: address ? address : company.address,
    });

    const updatedCompany = await companyRepo.findOneBy({ id });
   
    return updatedCompany;
};

export default updateCompanyService;
