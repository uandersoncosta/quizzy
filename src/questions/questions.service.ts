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

  async findOne(quizId: number, questionId: number) {
    const quiz = await this.quizRepository.findOneBy({ id: quizId });
    const question = await this.questionRepository.findOneBy({
      id: questionId,
    });

    if (!quiz && !question) {
      throw new NotFoundException('Quiz ou Question não encontrado!');
    }

    return { question };
  }

  async update(
    quizId: number,
    questionId: number,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    const quiz = await this.quizRepository.findOneBy({ id: quizId });
    const question = await this.questionRepository.findOne({
      where: { id: questionId, quiz: { id: quizId } },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz com ID ${quizId} não encontrado`);
    }

    if (!question) {
      throw new NotFoundException(
        `Questão com ID ${questionId} não encontrada para este quiz`,
      );
    }

    const editedQuestion = {
      question_text: updateQuestionDto?.question_text ?? question.question_text,
      correct_answer:
        updateQuestionDto?.correct_answer ?? question.correct_answer,
      explanation: updateQuestionDto?.explanation ?? question.explanation,
      options: {
        A: updateQuestionDto?.options?.A ?? question.options.A,
        B: updateQuestionDto?.options?.B ?? question.options.B,
        C: updateQuestionDto?.options?.C ?? question.options.C,
        D: updateQuestionDto?.options?.D ?? question.options.D,
      },
    };

    // const newQuestion = await this.questionRepository.preload({
    //   id: questionId,
    //   updated_at: new Date(),
    //   ...editedQuestion,
    // });

    Object.assign(question, editedQuestion);

    return await this.questionRepository.save(question);
  }

  remove(quizId: number, questionId: number) {
    return `This action removes a #${questionId} question`;
  }
}
