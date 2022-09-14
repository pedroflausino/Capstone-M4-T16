import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./category.entity";
import { Company } from "./company.entity";
import { Order_Products } from "./orderProducts.entity";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @Column()
  expirationDate: string;

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @OneToMany(() => Order_Products, (orderProducts) => orderProducts.product)
  orderProducts: Order_Products[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
