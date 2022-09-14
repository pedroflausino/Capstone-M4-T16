export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  address: IAddressRequest;
  isAdm: boolean;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdm: boolean;
  createdAt: string;
  updatedAt: string;
  address: IAddressRequest;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserId {
  id: string;
  isActive: boolean;
}

export interface IMyid {
  id: string;
}

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  address: IAddressRequest;
}
