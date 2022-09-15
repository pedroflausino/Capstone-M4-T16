import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IAddress } from "../../interfaces/address";

const updateAddressService = async (
  id: string,
  { district, zipCode, number, city, state }: IAddress
) => {
  const userRepo = AppDataSource.getRepository(User);
  const companyRepo = AppDataSource.getRepository(Company);
  const addressRepo = AppDataSource.getRepository(Addresses);

  const users = await userRepo.find();
  const companies = await companyRepo.find();

  const user = users.find((e) => e.id === id);
  const company = companies.find((e) => e.id === id);

  if (!user && !company) {
    throw new AppError("Invalid Id", 402);
  }

  if (!user && company) {
    const idAddress = company.address.id;

    if (district) {
      await addressRepo.update(idAddress, { district });
    }
    if (zipCode) {
      await addressRepo.update(idAddress, { zipCode });
    }
    if (number) {
      await addressRepo.update(idAddress, { number });
    }
    if (city) {
      await addressRepo.update(idAddress, { city });
    }
    if (state) {
      await addressRepo.update(idAddress, { state });
    }

    const newAdress = await addressRepo.findOneBy({ id: idAddress });

    return newAdress;
  }
  if (!company && user) {
    const idAddress = user.address.id;

    if (district) {
      await addressRepo.update(idAddress, { district });
    }
    if (zipCode) {
      await addressRepo.update(idAddress, { zipCode });
    }
    if (number) {
      await addressRepo.update(idAddress, { number });
    }
    if (city) {
      await addressRepo.update(idAddress, { city });
    }
    if (state) {
      await addressRepo.update(idAddress, { state });
    }

    const newAdress = await addressRepo.findOneBy({ id: idAddress });

    return newAdress;
  }
};

export default updateAddressService;
