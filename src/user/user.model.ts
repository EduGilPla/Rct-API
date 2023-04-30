import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
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
