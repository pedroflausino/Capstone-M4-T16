import { IUser } from "../users";

export interface IAddressRequest {
    district: string;
    zipCode: string;
    number?: string;
    city: string;
    state: string;
}

export interface ICompanyRequest {
    name: string;
    address: IAddressRequest;
}

export interface ICompany {
    name: string,
    address: IAddressRequest,
    isActive: boolean,
    isOpen: boolean,
    createdAt: string,
    updatedAt: string,
    user: IUser,
    id?: string
}

export interface ICompanyId {
    id: string;
    isActive: boolean;
}

export interface ICompanyUpdateRequest {
    name?: string;
    isOpen?: boolean;
    address?: IAddressRequest;
}
