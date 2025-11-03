import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { QuestionOptions, QuestionType } from '../entities/question.entity';

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
  @MinLength(5)
  @MaxLength(150)
  @ApiProperty({
    example: {
      A: 'Data Definition Language',
      B: 'Data Manipulation Language',
      C: 'Data Query Language',
      D: 'Data Control Language',
    },
    description: 'Alternativas da questão',
  })
  options: QuestionOptions;

  @MinLength(2)
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
