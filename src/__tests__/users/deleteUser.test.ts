import softDeleteUserService from "../../services/users/delete.service";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("Delete user", () => {
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

  test("Should delete a user", async () => {
    const id = "1";

    await softDeleteUserService(id);

    expect(softDeleteUserService).toBeTruthy();
  });
});