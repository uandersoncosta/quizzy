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

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get(':userid')
  findAll(@Param('userid') id: number) {
    return this.quizzesService.findAll(+id);
  }

  @Get(':userid/:quizId')
  findOne(@Param('userid') id: string, @Param('quizId') userId: string) {
    return this.quizzesService.findOne(+id, +userId);
  }

  @Patch(':userId/:quizId')
  update(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(+userId, +quizId, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
