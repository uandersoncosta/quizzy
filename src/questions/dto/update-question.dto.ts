import {
  PartialType,
  OmitType,
  ApiExtraModels,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsOptional,
  ValidateNested,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

class PartialQuestionOptionsDto {
  @ApiPropertyOptional({ example: 'Data Definition Language' })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  A?: string;

  @ApiPropertyOptional({ example: 'Data Manipulation Language' })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  B?: string;

  @ApiPropertyOptional({ example: 'Data Query Language' })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  C?: string;

  @ApiPropertyOptional({ example: 'Data Control Language' })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  D?: string;
}

@ApiExtraModels(PartialQuestionOptionsDto)
export class UpdateQuestionDto extends PartialType(
  OmitType(CreateQuestionDto, ['options', 'question_type'] as const),
) {
  @ApiPropertyOptional({
    type: PartialQuestionOptionsDto,
    example: {
      A: 'Data Definition Language',
      B: 'Data Manipulation Language',
      C: 'Data Query Language',
      D: 'Data Control Language',
    },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PartialQuestionOptionsDto)
  options?: PartialQuestionOptionsDto;
}
