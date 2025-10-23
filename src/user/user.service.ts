import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUserData = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      created_at: new Date(),
    };

    const emailExiste = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExiste) {
      throw new ConflictException('Este e-mail já existe.');
    }

    const newUser = this.userRepository.create(newUserData);
    this.userRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Este Id não existe');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
