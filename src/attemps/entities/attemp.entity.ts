import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Users } from 'src/user/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Attemp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: Users;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quizId: Quiz;

  @Column({ length: 100 })
  score: number;

  @Column({ length: 100 })
  total_questions: number;

  @Column({ length: 100 })
  correct_anwser: number;

  @Column({ length: 100 })
  time_spent: number;

  @UpdateDateColumn()
  completed_at: Date;
}
