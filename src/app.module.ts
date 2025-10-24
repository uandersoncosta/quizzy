import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { Users } from './user/entities/users.entity';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/entities/quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbQuizzy.sqlite',
      entities: [Users, Quiz],
      synchronize: true,
    }),
    UsersModule,
    QuizzesModule,
  ],
})
export class AppModule {}
