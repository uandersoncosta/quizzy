import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({ example: 'joao.costa' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'joao.costa@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: '123456789' })
  password: string;
}
