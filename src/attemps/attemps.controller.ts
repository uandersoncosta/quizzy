import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttempsService } from './attemps.service';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';

@Controller('attemps')
export class AttempsController {
  constructor(private readonly attempsService: AttempsService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Body() createAttempDto: CreateAttempDto,
  ) {
    return this.attempsService.create(userId, quizId, createAttempDto);
  }

  @Get()
  findAll(@Param('userId') userId: string, @Param('quizId') quizId: string) {
    return this.attempsService.findAll(+userId, +quizId);
  }

  @Get(':attemp')
  findOne(
    @Param('attemp') attemp: string,
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ) {
    return this.attempsService.findOne(+attemp, +userId, +quizId);
  }

  @Patch(':attemp')
  update(
    @Param('attemp') attemp: string,
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Body() updateAttempDto: UpdateAttempDto,
  ) {
    return this.attempsService.update(
      +attemp,
      +userId,
      +quizId,
      updateAttempDto,
    );
  }

  @Delete(':attemp')
  remove(
    @Param('attemp') attemp: string,
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ) {
    return this.attempsService.remove(+attemp, +userId, +quizId);
  }
}
