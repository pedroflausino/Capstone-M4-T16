import request  from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";


const mockedAdminLogin = {
    
    email: "email@test.com",
    password: "123"
}

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
    let companyId: string;
    test("should create an company in database", async () => {
        const name = "companyName";
        const address = {
            district: "testDistrict",
            city: "testCityy",
            zipCode: "11111",
            state: "AA",
            number: "12"
        };
        
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
        const createdUser = await request(app).post("/users").send(user);
        
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const createdCompany = await request(app).post("/companies").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send({name,address});
        companyId = createdCompany.body.id
        console.log(createdCompany.body)
        expect(createdCompany.body).toEqual(expect.objectContaining({
            address: expect.any(Object),
            id: expect.any(String),
            name,
            isActive: true,
            isOpen: false,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: expect.any(Object)

        }))
    });

    test("should list companies", async ()=> {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get("/companies").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })
    test("should list an company", async ()=> {
        const adminLoginResponse = await request(app).post("/login/"+`${companyId}`).send(mockedAdminLogin);
        const response = await request(app).get("/companies").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.any(Object))
    })

});


