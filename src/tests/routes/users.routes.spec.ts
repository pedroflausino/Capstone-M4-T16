import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUserLogin,
} from "../mocks";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("address");
    expect(response.body.name).toEqual("Eduardo");
    expect(response.body.email).toEqual("eduardo@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.isActive).toEqual(true);
  });

  test("POST /users -  Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users - Should be able to return a list of all registered users", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app).post("/login");
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    console.log(response.body);
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should be able to update a user by id", async () => {
    const response = await request(app).put("/users/1").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("address");
    expect(response.body.name).toEqual("Eduardo");
    expect(response.body.email).toEqual("eduardo@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.isActive).toEqual(true);
  });

  test("PATCH /users/:id -  Should not be able to update a user that already exists", async () => {
    const response = await request(app).put("/users").send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  //
  test("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body[0]}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/users").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0]}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });

  test("DELETE /users/:id -  shouldn't be able to delete user with isActive = false", async () => {
    await request(app).post("/users").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0]}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
