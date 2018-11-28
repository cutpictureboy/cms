import { Exclude } from 'class-transformer';

export class ArticleVo {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly tag: string;

  @Exclude()
  readonly createAt: Date;

  @Exclude()
  readonly updateAt: Date;

  @Exclude()
  readonly version: number;

  constructor(partial: Partial<ArticleVo>) {
    Object.assign(this, partial);
  }
}
