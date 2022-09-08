import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ nullable: true, length: 6 })
  number: string;

  @Column()
  district: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
