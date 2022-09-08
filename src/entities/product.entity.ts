import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  quantity: number

  @Column()
  price: number

  @Column()
  expirationDate: string

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}