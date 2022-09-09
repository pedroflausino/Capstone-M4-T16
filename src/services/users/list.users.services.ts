import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUsersService = async () => {
    const usersRepo = AppDataSource.getRepository(User);
    const users = await usersRepo.find();

    return users;
};

export default listUsersService;