import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  status: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
