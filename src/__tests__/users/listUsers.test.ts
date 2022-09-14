import listUsersService from "../../services/users/list.users.services";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("List all users", () => {
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

  test("Should list all registered users", async () => {
    const users = await listUsersService();

    expect(users).toHaveProperty("map");
  });
});


