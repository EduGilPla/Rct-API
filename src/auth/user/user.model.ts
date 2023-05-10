import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(firstName: string, lastName: string, email: string, hash: string) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.hash = hash,
    this.createdAt = new Date()
    this.updatedAt = this.createdAt
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
}
