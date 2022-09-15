import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import createCompanyService from "../../services/companies/createCompany.service";
import createUserService from "../../services/users/create.services";

describe("Create an company", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error("Error during Data source initalization", err);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("should create an company in database", async () => {
        const name = "companyName";
        const address = {
            district: "testDistrict",
            city: "testCityy",
            zipCode: "11111",
            state: "AA",
        };
        const testCompany = { name, address };
        const user = {
            name: "testUserName",
            email: "email@test.com",
            password: "123",
            isAdm: true,
            address: {
                district: "testDistricttt",
                city: "testCityyyy",
                zipCode: "1111",
                state: "AB",
            },
        };
        const createdUser = await createUserService(user);
        const createdCompany = await createCompanyService(createdUser.id, {
            name,
            address,
        });

        expect(createdCompany).toEqual(expect.objectContaining({
            id: expect.any(String),
            name,
            address,
            isActive: true,
            isOpen: false,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: expect

        }))
    });
});
