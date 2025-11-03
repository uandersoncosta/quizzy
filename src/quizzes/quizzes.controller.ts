import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('users/:userId/quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return this.quizzesService.create(+userId, createQuizDto);
  }

  @Get()
  findAll(@Param('userId') id: number) {
    return this.quizzesService.findAll(+id);
  }

  @Get(':quizId')
  findOne(@Param('userId') id: string, @Param('quizId') userId: string) {
    return this.quizzesService.findOne(+id, +userId);
  }

  @Patch(':quizId')
  update(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(+userId, +quizId, updateQuizDto);
  }

  @Delete(':quizId')
  remove(@Param('userId') userId: string, @Param('quizId') quizId: string) {
    return this.quizzesService.remove(+userId, +quizId);
  }
}
