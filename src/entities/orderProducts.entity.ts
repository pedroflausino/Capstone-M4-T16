import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Order_Products")
export class Order_Products {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
