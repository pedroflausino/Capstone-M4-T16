export interface IAddressRequest {
    district: string;
    zipCode: string;
    number?: string;
    city: string;
    state: string;
}

export interface ICompanyRequest {
    name: string;
    email: string;
    password?: string;
    address: IAddressRequest;
}

export interface ICompany {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    address: IAddressRequest;
}

export interface ICompanyLogin {
    email: string;
    password: string;
}

export interface ICompanyId {
    id: string;
    isActive: boolean;
}

export interface ICompanyUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
    isOpen?: boolean;
    address?: IAddressRequest;
}
