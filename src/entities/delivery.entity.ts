import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./order.entity";

@Entity("Delivery")
export class Delivery {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Order, (orders) => orders.delivery)
  orders: Order[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
