import {DataSource} from "typeorm";
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app";
import createCompanyService from "../../services/companies/createCompany.service";
import createUserService from "../../services/users/create.services";
import createCategoryService from "../../services/categories/createCategory.service";
import { createProductsService } from "../../services/products/createProduct.service";
import { array } from "yup";
const mockedAdminLogin = {
    name: "testUserName",
    email: "email@test.com",
    password: "123"
}

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

const companyName = "companyName";
        const address = {
            district: "testDistrict",
            city: "testCityy",
            zipCode: "11111",
            state: "AA",
        };

        const categoryName = "bebidas"
        let categoryId: any
        let companyId: any

describe("testing the product routes", ()=> {
    let connection: DataSource;

    beforeAll(async()=> {
        await AppDataSource.initialize()
        .then((res)=> (connection = res))
        .catch((err)=>{
            console.error("Error during Data Source initialization", err);
        });
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    test("Should be able to create a new product", async()=>{


   
        

        const name = "Vinho"
        const description = "Cantina da Serra"
        const quantity = 20
        const price = "10R$"
        const expirationDate = "10/10/2022"
      
        const createCategory = await createCategoryService(categoryName)
        const createdUser = await createUserService(user);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);

        const createdCompany = await createCompanyService(createdUser.id, {
            name,
            address,
        });



         categoryId = createCategory.id
         companyId =  createdCompany.id
        const productData = {name, description, quantity, price, expirationDate, companyId, categoryId}
        const response = await request(app).post("/products").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(productData)
        expect(response.status).toBe(201)
        expect(response.body.newProduct).toHaveProperty("name")
        expect(response.body.newProduct).toHaveProperty("description")
        expect(response.body.newProduct).toHaveProperty("expirationDate")

    })

    test("Should be able to delete a product", async()=>{


        const name = "Cachaça de Jambu"
        const description = "Açaí"
        const quantity = 20
        const price = 10
        const expirationDate = "10/10/2022"
      
     
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);

    


        const productData = {name, description, quantity, price, expirationDate, companyId, categoryId}
        const createProduct = await createProductsService(productData)
        const response = await request(app).delete(`/products/${createProduct.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(200)
        


})

test("Should be able to list all products", async()=>{


  
 
    const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);



    const response = await request(app).get(`/products/`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("map")
    


})

test("Should be able to list one product", async()=>{


    const name = "Cerveja"
    const description = "Eisenbahn"
    const quantity = 20
    const price = 10
    const expirationDate = "10/10/2022"
  
 
    const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);




    const productData = {name, description, quantity, price, expirationDate, companyId, categoryId}
    const createProduct = await createProductsService(productData)
    const response = await request(app).get(`/products/${createProduct.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("expirationDate")


})

test("Should be able to update one product", async()=>{


    const name = "Whisky"
    const description = "Stone"
    const quantity = 20
    const price = 10
    const expirationDate = "10/10/2022"
  
 
    const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);




    const productData = {name, description, quantity, price, expirationDate, companyId, categoryId}
    const createProduct = await createProductsService(productData)

    
    const newName = "Vinho"
    const newDescription = "Cantina da Serra"
    const newQuantity = 20
    const newPrice = "10R$"
    const newExpirationDate = "10/10/2022"

    const updatedProductData = {newName, newDescription, newQuantity, newPrice, newExpirationDate}
    const response = await request(app).patch(`/products/${createProduct.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(updatedProductData)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("expirationDate")


})



})