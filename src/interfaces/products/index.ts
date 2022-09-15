import { ICategory } from "../categories";
import { ICompany } from "../companies";

export interface IProductRequest {
  name: string;
  description: string;
  quantity: number;
  price: number;
  expirationDate: string;
  companyId: string;
  categoryId: string;
}

export interface IProductUpdate {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  expirationDate?: string;
  companyId?: string;
  categoryId?: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  expirationDate: string;
  company: ICompany;
  category: ICategory;
}
