import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Delivery } from "./delivery.entity";
import { Order_Products } from "./orderProducts.entity";
import { User } from "./user.entity";

@Entity("Order")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    status: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Delivery)
    delivery: Delivery;

    @OneToMany(() => Order_Products, (orderProducts) => orderProducts.order, {
        eager: true,
    })
    orderProducts: Order_Products[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
