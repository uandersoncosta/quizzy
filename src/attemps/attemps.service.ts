import { Injectable } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attemp } from './entities/attemp.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Users } from 'src/user/entities/users.entity';

@Injectable()
export class AttempsService {
  constructor(
    @InjectRepository(Attemp)
    private readonly attempRepository: Repository<Attemp>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  create(userId: number, quizId: number, createAttempDto: CreateAttempDto) {
    return 'This action adds a new attemp';
  }

  findAll(userId: number, quizId: number) {
    return `This action returns all attemps`;
  }

  findOne(userId: number, quizId: number, attempId: number) {
    return `This action returns a #${attempId} attemp`;
  }

  update(
    userId: number,
    quizId: number,
    attempId: number,
    updateAttempDto: UpdateAttempDto,
  ) {
    return `This action updates a #${attempId} attemp`;
  }

  remove(userId: number, quizId: number, attempId: number) {
    return `This action removes a #${attempId} attemp`;
  }
}
