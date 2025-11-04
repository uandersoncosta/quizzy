import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async create(quizId: number, createQuestionDto: CreateQuestionDto[]) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException('Quiz não encontrado!');
    }

    const question = createQuestionDto.map((question) => {
      return this.questionRepository.create({
        quiz,
        ...question,
      });
    });

    return this.questionRepository.save(question);
  }

  async findAll(quizId: number) {
    const quiz = await this.quizRepository.findOneBy({ id: quizId });

    if (!quiz) {
      throw new NotFoundException('Quiz não encontrado!');
    }

    const question = await this.questionRepository.find();

    return { question };
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
