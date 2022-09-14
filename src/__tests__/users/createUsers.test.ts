import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import createUserService from "../../services/users/create.services";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  // afterAll(async () => {
  //   await connection.destroy();
  // });
});

test("Should create a new user", async () => {
  const name = "name";
  const email = "email@mail.com";
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

  const newUser = await createUserService(userData);

  expect(newUser).toEqual(
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
