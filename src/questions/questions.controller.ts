import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('quizzes/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiBody({ type: [CreateQuestionDto] })
  create(
    @Param('quizId') quizId: string,
    @Body() createQuestionDto: CreateQuestionDto[],
  ) {
    return this.questionsService.create(+quizId, createQuestionDto);
  }

  @Get()
  findAll(@Param('quizId') quizId: string) {
    return this.questionsService.findAll(+quizId);
  }

  @Get(':questionId')
  findOne(@Param('quizId') quizId: string, @Param('questionId') questionId: string) {
    return this.questionsService.findOne(+quizId, +questionId);
  }

  @Patch(':questionId')
  update(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+quizId, +questionId, updateQuestionDto);
  }

  @Delete(':questionId')
  remove(@Param('quizId') quizId: string, @Param('questionId') questionId: string) {
    return this.questionsService.remove(+quizId, +questionId);
  }
}
