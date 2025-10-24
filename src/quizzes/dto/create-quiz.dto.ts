import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, MaxLength, MinLength } from 'class-validator';

export class CreateQuizDto {

  @IsPositive()
  @ApiProperty({ example: 1 })
  userId: number

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  @ApiProperty({ example: 'DDL, DML, DQL, DCL' })
  title: string;

  @MaxLength(255)
  @ApiProperty({ example: 'Criar um quiz sobre funcionalidades dos comandos SQL' })
  description?: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Fácil' })
  category: string;

  @IsNotEmpty()
  difficulty: string;
}
