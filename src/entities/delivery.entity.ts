import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
