import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attemp } from './entities/attemp.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Users } from 'src/user/entities/users.entity';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AttempsService {
  constructor(
    @InjectRepository(Attemp)
    private readonly attempRepository: Repository<Attemp>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Users)
    private readonly userRepository: UsersService,
  ) {}

  async create(
    userId: number,
    quizId: number,
    createAttempDto: CreateAttempDto,
  ) {
    const { score, completed_at, correct_anwser, time_spent, total_questions } =
      createAttempDto;
    const user = await this.userRepository.findOne(userId);
    const quiz = await this.quizRepository.findOneBy({ id: quizId });

    if (!user) throw new NotFoundException('Usuário não encontrado!');
    if (!quiz) throw new NotFoundException('Usuário não encontrado!');

    const newAttemp = {
      score,
      correct_anwser,
      time_spent,
      total_questions,
      completed_at,
    };

    const attemp = await this.attempRepository.create(newAttemp);
    await this.attempRepository.save(attemp);

    return { attemp };
  }

  async findAll(userId: number, quizId: number) {
    const user = await this.userRepository.findOne(userId);
    const quiz = await this.quizRepository.findOneBy({ id: quizId });

    if (!user) throw new NotFoundException('Usuário não encontrado!');
    if (!quiz) throw new NotFoundException('Usuário não encontrado!');

    const attemp = await this.attempRepository.find()

    return `This action returns all attemps`;
  }

  async findOne(userId: number, quizId: number, attempId: number) {
    return `This action returns a #${attempId} attemp`;
  }

  async update(
    userId: number,
    quizId: number,
    attempId: number,
    updateAttempDto: UpdateAttempDto,
  ) {
    return `This action updates a #${attempId} attemp`;
  }

  async remove(userId: number, quizId: number, attempId: number) {
    return `This action removes a #${attempId} attemp`;
  }
}
