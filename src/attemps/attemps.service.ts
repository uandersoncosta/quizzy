import { Injectable } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';

@Injectable()
export class AttempsService {
  create(createAttempDto: CreateAttempDto) {
    return 'This action adds a new attemp';
  }

  findAll() {
    return `This action returns all attemps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attemp`;
  }

  update(id: number, updateAttempDto: UpdateAttempDto) {
    return `This action updates a #${id} attemp`;
  }

  remove(id: number) {
    return `This action removes a #${id} attemp`;
  }
}
