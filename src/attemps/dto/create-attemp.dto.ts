import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateAttempDto {
  @ApiProperty({
    description: 'Pontuação total obtida pelo usuário no quiz',
    example: 8,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @ApiProperty({
    description: 'Número total de perguntas do quiz',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  total_questions: number;

  @ApiProperty({
    description: 'Quantidade de respostas corretas do usuário',
    example: 8,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  correct_anwser: number;

  @ApiProperty({
    description: 'Tempo gasto na tentativa em segundos',
    example: 120,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  time_spent: number;

  @ApiProperty({
    description: 'Data e hora de conclusão do quiz',
    example: '2025-11-13T15:30:00Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDate()
  completed_at: Date;
}
