import { Module } from '@nestjs/common';
import { AttempsService } from './attemps.service';
import { AttempsController } from './attemps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attemp } from './entities/attemp.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Users } from 'src/user/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attemp, Quiz]), Users],
  controllers: [AttempsController],
  providers: [AttempsService],
})
export class AttempsModule {}
