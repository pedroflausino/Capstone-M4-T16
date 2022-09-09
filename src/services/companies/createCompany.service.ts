import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";
import { ICompanyRequest } from "../../interfaces/companies";
import { hash } from "bcrypt";

const createCompanyService = async ({
    name,
    email,
    password,
    address,
}: ICompanyRequest) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const addressRepo = AppDataSource.getRepository(Addresses);

    const emailAlreadyInUse = await companyRepo.findOneBy({ email });
    const nameAlreadyInUse = await companyRepo.findOneBy({ name });
    const addressAlreadyInUse = await companyRepo.findOneBy({ address });

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
   

    const newCompany = companyRepo.create({
        name,
        email,
        password: hashedPassword,
        address: newAddress,
        isActive: true,
        isOpen: false,
    });
    
    await companyRepo.save(newCompany);

    delete newCompany.password;

    return newCompany;
};

export default createCompanyService;
