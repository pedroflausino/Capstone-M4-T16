import AppDataSource from "./../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";


const softDeleteUserService = async (id: string): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);
    const currentUser = await userRepository.findOneBy({ id });
  
    if (!currentUser) throw new AppError("User not found", 404);
    if (currentUser.isActive == false) throw new AppError("Inactive User", 409);
  
    currentUser.isActive = false;
  
    await userRepository.update({ id }, currentUser);
  };

export default softDeleteUserService;