import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./address.entity";
import { Company } from "./company.entity";
import { Order } from "./order.entity";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
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
  isAdm: boolean;

  @OneToOne(() => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
