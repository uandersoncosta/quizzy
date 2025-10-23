import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100 })
  Name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  Password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  uploaded_at?: Date;

  @DeleteDateColumn()
  excluded_at?: Date;
}
