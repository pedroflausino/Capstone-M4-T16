import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity("Order_Products")
export class Order_Products {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Order, (order)=>order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (prod)=> prod.orderProducts, {
    eager: true
  })
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
