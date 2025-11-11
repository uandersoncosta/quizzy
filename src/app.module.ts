import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { Users } from './user/entities/users.entity';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/entities/quiz.entity';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/question.entity';
import { AttempsModule } from './attemps/attemps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbQuizzy.sqlite',
      entities: [Users, Quiz, Question],
      synchronize: true,
    }),
    UsersModule,
    QuizzesModule,
    QuestionsModule,
    AttempsModule,
  ],
})
export class AppModule {}
