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
