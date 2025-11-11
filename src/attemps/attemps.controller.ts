import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttempsService } from './attemps.service';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';

@Controller('attemps')
export class AttempsController {
  constructor(private readonly attempsService: AttempsService) {}

  @Post()
  create(@Body() createAttempDto: CreateAttempDto) {
    return this.attempsService.create(createAttempDto);
  }

  @Get()
  findAll() {
    return this.attempsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attempsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttempDto: UpdateAttempDto) {
    return this.attempsService.update(+id, updateAttempDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attempsService.remove(+id);
  }
}
