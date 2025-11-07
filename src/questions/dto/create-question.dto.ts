import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { QuestionOptions, QuestionType } from '../entities/question.entity';
import { Type } from 'class-transformer';

class QuestionOptionsDto {
  @IsString()
  @Length(3, 150)
  A: string;

  @IsString()
  @Length(3, 150)
  B: string;

  @IsString()
  @Length(3, 150)
  C: string;

  @IsString()
  @Length(3, 150)
  D: string;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  @ApiProperty({ example: 'Quais são os principais tipos de comandos SQL?' })
  question_text: string;

  @IsNotEmpty()
  @ApiProperty({
    example: QuestionType.MULTIPLA_ESCOLHA,
    enum: QuestionType,
    description: 'Tipo da questão',
  })
  question_type: QuestionType;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => QuestionOptionsDto)
  @ApiProperty({
    example: {
      A: 'Data Definition Language',
      B: 'Data Manipulation Language',
      C: 'Data Query Language',
      D: 'Data Control Language',
    },
  })
  options: QuestionOptionsDto;

  @MinLength(1)
  @ApiProperty({ example: 'A' })
  correct_answer: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  @ApiProperty({
    example: 'DDL é usado para definir a estrutura do banco de dados.',
    description: 'Explicação da resposta correta',
  })
  explanation: string;
}
