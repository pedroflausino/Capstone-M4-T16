import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";
import {
    ICompanyRequest,
    ICompanyUpdateRequest,
} from "../../interfaces/companies";
import { hash } from "bcrypt";

const updateCompanyService = async (
    id: string,
    { name, email, password, address }: ICompanyUpdateRequest
) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const company = await companyRepo.findOneBy({ id });

    if (!company) {
        throw new AppError("company not found", 404);
    }

    await companyRepo.update(id, {
        name: name ? name : company.name,
        email: email ? email : company.email,
        password: password ? await hash(password, 10) : company.password,
        address: address ? address : company.address,
    });

    const updatedCompany = await companyRepo.findOneBy({ id });
    if (updatedCompany) {
        delete updatedCompany.password;
    }
    return updatedCompany;
};

export default updateCompanyService;
