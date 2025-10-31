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

@Controller('quizzes/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Param('quizId') quizId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll(@Param('quizId') quizId: string) {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('quizId') quizId: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('quizId') quizId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('quizId') quizId: string) {
    return this.questionsService.remove(+id);
  }
}
