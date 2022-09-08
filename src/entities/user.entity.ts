import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
