import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly usersRepository: UsersService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const { userId, title, category, difficulty, description } = createQuizDto;

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

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
