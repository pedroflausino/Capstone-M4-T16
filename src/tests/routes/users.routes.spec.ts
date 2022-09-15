import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

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

  test("Should be able to create a new user", async () => {
    const email = "email@mail.com";
    const name = "name";
    const password = "123456";
    const address = {
      state: "state",
      city: "city",
      zipCode: "12345678",
      number: "123",
      district: "district",
    };
    const isActive = true;
    const isAdmin = false;

    const userData = { name, email, password, address, isActive, isAdmin };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        email,
        password,
        address,
        isActive,
        isAdmin,
      })
    );
  });
});

test("Should be able to return a list of all registered users", async () => {
  const response = await request(app).get("/users");

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("map");
});

test("Should be able to return a user by id", async () => {
  const response = await request(app).get("/users/1");

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("id");
});

test("Should be able to update a user by id", async () => {
  const email = "emailtest@mail.com";
  const name = "name";
  const password = "123456";
  const address = {
    state: "state",
    city: "city",
    zipCode: "12345678",
    number: "123",
    district: "district",
  };
  const isActive = true;
  const isAdmin = false;

  const userData = { name, email, password, address, isActive, isAdmin };

  const response = await request(app).put("/users/1").send(userData);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("id");
});

test("Should be able to delete a user by id", async () => {
  const response = await request(app).delete("/users/1");

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("id");
});
