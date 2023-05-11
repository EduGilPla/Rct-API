import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.enum';

@Entity()
export class User {
  constructor(firstName: string, lastName: string, email: string, hash: string, role: Role) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.hash = hash,
    this.createdAt = new Date()
    this.updatedAt = this.createdAt
    this.role = role;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  hash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  createdAt: Date;
  
  @Column()
  updatedAt: Date;

  @Column()
  role: Role;
}
