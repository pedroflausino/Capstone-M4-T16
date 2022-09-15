import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing the categories routes", () => {
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

  test("Should be able to return a list of all registered products", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});

test("Should be able to return a product by id registered", async () => {
  const response = await request(app).get("/categories/1");

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("id");
});