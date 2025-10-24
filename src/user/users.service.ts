import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const newUserData = {
      name: createUsersDto.name,
      email: createUsersDto.email,
      password: createUsersDto.password,
      created_at: new Date(),
    };

    const emailExiste = await this.userRepository.findOneBy({
      email: createUsersDto.email,
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

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
