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
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    address: IAddressRequest;
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
