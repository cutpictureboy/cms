import { Exclude } from 'class-transformer';
import { Article } from 'entity/article.entity';

export class ArticleVo extends Article {
  constructor(partial: Partial<ArticleVo>) {
    super();
    Object.assign(this, partial);
  }
}
