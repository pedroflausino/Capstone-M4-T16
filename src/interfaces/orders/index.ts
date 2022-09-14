export interface IOrderRequest {
  status: string;
  userId: string;
  delivery: string;
  products: string[];
}

export interface IOrder {
  id: string;
}
