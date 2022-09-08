import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
