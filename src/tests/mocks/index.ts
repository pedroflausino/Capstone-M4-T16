import { IUserLogin,IUserRequest } from "../../interfaces/users";

export const mockedUser : IUserRequest = {
    name: "Eduardo",
    email: "eduardo@mail.com",
    password: "123456",
    address: {
        district: "Centro",
        zipCode: "12345678",
        number: "123",
        city: "São Paulo",
        state: "SP"
    },
    isAdm: false,
}

export const mockedAdmin : IUserRequest = {
    name: "Eduardo",
    email: "eduardo@mail.com",
    isAdm: true,
    password: "123456",
    address: {
        district: "Centro",
        zipCode: "12358798",
        number: "125",
        city: "Recife",
        state: "PE"
    }, 
}

export const mockedUserLogin : IUserLogin = {
    email: "joana@mail.com",
    password: "123456"
}

export const mockedAdminLogin : IUserLogin = {
    email: "pedro@mail.com",
    password: "123456"
}
