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
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  uploaded_at?: Date;

  @DeleteDateColumn()
  excluded_at?: Date;
}
