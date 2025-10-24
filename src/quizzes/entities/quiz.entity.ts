import { Users } from 'src/user/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Difficulty {
  FACIL = 'Fácil',
  MEDIO = 'Médio',
  DIFICIL = 'Díficil',
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 150, nullable: true })
  description?: string;

  @Column({ length: 50 })
  category: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.FACIL,
  })
  difficulty: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
