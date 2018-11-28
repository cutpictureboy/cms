import { Post, Controller, Body, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, GetArticleListDto, GetArticleDto } from './article.dto';
import { ArticleVo } from './artcile.vo';
import { ListVo } from 'src/common/vo/result.vo';

@Controller('article')
export class ArticleController {
  private readonly articleService: ArticleService;
  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }

  @Post('create')
  async createArticle(@Body() param: CreateArticleDto): Promise<ArticleVo> {
    return new ArticleVo(await this.articleService.createArticle(param));
  }

  @Get('getList')
  async getArticleList(@Query() param: GetArticleListDto): Promise<ListVo<ArticleVo>> {
    const result = await this.articleService.getArticleList(param);
    return new ListVo({
      size: result.size,
      list: result.list.map(article => new ArticleVo(article)),
    });
  }

  @Get('get')
  async getArticle(@Query() param: GetArticleDto): Promise<ArticleVo> {
    return new ArticleVo(await this.articleService.getArticle(param));
  }
}
