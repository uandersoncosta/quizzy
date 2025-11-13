import { Module } from '@nestjs/common';
import { AttempsService } from './attemps.service';
import { AttempsController } from './attemps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attemp } from './entities/attemp.entity';
import { UsersModule } from 'src/user/users.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attemp]), UsersModule, QuizzesModule],
  controllers: [AttempsController],
  providers: [AttempsService],
})
export class AttempsModule {}
