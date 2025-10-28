import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/user/users.service';
import { time } from 'console';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly usersRepository: UsersService,
  ) {}

  async create(userId: number, createQuizDto: CreateQuizDto) {
    const { title, category, difficulty, description } = createQuizDto;

    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new ConflictException('Este usuário não existe.');
    }

    const novoQuiz = {
      user,
      title,
      description,
      category,
      difficulty,
      created_at: new Date(),
    };

    const quiz = await this.quizRepository.create(novoQuiz);
    await this.quizRepository.save(quiz);
    return quiz;
  }

  async findAll(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new ConflictException('Este usuário não existe.');
    }

    const quizzes = await this.quizRepository.find();

    return { quizzes };
  }

  async findOne(id: number, quizId: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new ConflictException('Este usuário não existe.');
    }

    const quiz = await this.quizRepository.findOne({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      throw new ConflictException('Quiz não encontrado para este usuário.');
    }

    return { quiz };
  }

  async update(userId: number, quizId: number, updateQuizDto: UpdateQuizDto) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new ConflictException('Este usuário não existe.');
    }

    const dadosQuiz = {
      title: updateQuizDto?.title,
      description: updateQuizDto?.description,
      category: updateQuizDto?.category,
    };

    const quiz = await this.quizRepository.preload({
      id: quizId,
      updated_at: new Date(),
      ...dadosQuiz,
    });

    if (!quiz) {
      throw new ConflictException('Quiz não encontrado para este usuário.');
    }

    return { quiz };
  }

  async remove(userId: number, quizId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new ConflictException('Este usuário não existe.');
    }

    const quiz = await this.quizRepository.findOneBy({ id: quizId });

    if (!quiz) {
      throw new ConflictException('Quiz não encontrado para este usuário.');
    }

    return await this.quizRepository.remove(quiz);
  }
}
