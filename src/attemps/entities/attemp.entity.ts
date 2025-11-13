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

  @Column('int')
  score: number;

  @Column('int')
  total_questions: number;

  @Column('int')
  correct_anwser: number;

  @Column('int')
  time_spent: number;

  @UpdateDateColumn()
  completed_at: Date;
}
