import { Quiz } from 'src/quizzes/entities/quiz.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum QuestionType {
  MULTIPLA_ESCOLHA = 'Múltipla escolha',
  VERDADEIRO_FALSO = 'Verdadeiro ou falso',
  RESPOSTA_CURTA = 'Resposta curta',
}

export interface QuestionOptions {
  A?: string;
  B?: string;
  C?: string;
  D?: string;
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column({ length: 250 })
  question_text: string;

  @Column({
    type: 'text',
    enum: QuestionType,
    default: QuestionType.MULTIPLA_ESCOLHA,
  })
  question_type: QuestionType;

  @Column({ type: 'jsonb' })
  options: QuestionOptions;

  @Column({ length: 1 })
  correct_answer: string;

  @Column({ length: 250 })
  explanation: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
