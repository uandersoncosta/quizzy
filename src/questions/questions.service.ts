import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: Repository<Question>,
    private readonly quizRepository: QuizzesService,
  ) {}

  create(quizId: number, createQuestionDto: CreateQuestionDto[]) {}

  findAll(quizId: number) {
    return `This action returns all questions`;
  }

  findOne(quizId: number, id: number) {
    return `This action returns a #${id} question`;
  }

  update(quizId: number, id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(quizId: number, id: number) {
    return `This action removes a #${id} question`;
  }
}
