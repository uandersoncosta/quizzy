import { Module } from '@nestjs/common';
import { AttempsService } from './attemps.service';
import { AttempsController } from './attemps.controller';

@Module({
  controllers: [AttempsController],
  providers: [AttempsService],
})
export class AttempsModule {}
