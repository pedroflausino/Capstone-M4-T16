import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity("Order_Products")
export class Order_Products {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Product,{
    eager: true
  })
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
