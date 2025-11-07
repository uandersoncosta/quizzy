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
    if (!quiz) throw new NotFoundException('Quiz não encontrado!');

    const question = await this.questionRepository.findOneBy({
      id: questionId,
    });
    if (!question) throw new NotFoundException('Question não encontrado!');

    // Garante que question.options é um objeto (evita problemas se for null/undefined/string)
    const currentOptions =
      question.options && typeof question.options === 'object'
        ? question.options
        : {};

    // Se vier options no DTO, faz merge; se não vier, mantém as atuais
    const optionsMerged = updateQuestionDto?.options
      ? { ...currentOptions, ...updateQuestionDto.options }
      : currentOptions;

    // Monta o payload final usando os valores atuais como fallback
    const questionEdited = {
      question_text: updateQuestionDto?.question_text ?? question.question_text,
      options: optionsMerged,
      // mantém correct_answer do DB (não permita alteração)
      correct_answer: question.correct_answer,
      explanation: updateQuestionDto?.explanation ?? question.explanation,
      updated_at: new Date(),
    };

    // Use create/merge + save (ou preload + checagem). Aqui uso merge + save direto:
    const mergedEntity = this.questionRepository.create({
      ...question, // valores atuais
      ...questionEdited, // sobrescreve com o que veio
    });

    const saved = await this.questionRepository.save(mergedEntity);

    return { question: saved };
  }

  remove(quizId: number, questionId: number) {
    return `This action removes a #${questionId} question`;
  }
}
