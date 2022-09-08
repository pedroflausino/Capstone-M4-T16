import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./address.entity";
import { Product } from "./product.entity";

@Entity("Company")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  isActive: boolean;

  @Column()
  isOpen: boolean;

  @OneToOne(() => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Product, (products) => products.company)
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
