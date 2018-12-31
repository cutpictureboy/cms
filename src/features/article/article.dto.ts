import { IsString, MinLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  content: string;

  @IsString()
  tag: string;
}

export class GetArticleListDto {

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;
}

export class GetArticleDto {
  @IsString()
  hash: string;
}