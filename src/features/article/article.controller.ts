import { Post, Controller, Body, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import * as ArticleDto from './article.dto';
import { ArticleVo } from './artcile.vo';
import { ListVo } from '../../common/vo/result.vo';

@Controller('article')
export class ArticleController {
  private readonly articleService: ArticleService;
  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }

  /**
   * 创建文章
   * @param param
   */
  @Post('create')
  async createArticle(
    @Body() param: ArticleDto.CreateArticleDto,
  ): Promise<ArticleVo> {
    return new ArticleVo(await this.articleService.createArticle(param));
  }

  /**
   * 发表文章
   * @param param
   */
  @Post('publish')
  async publishArticle(
    @Body() param: ArticleDto.GetArticleDto,
  ): Promise<void> {
    return await this.articleService.publishArticle(param);
  }

  /**
   * 获取文章列表
   * @param param
   */
  @Get('getList')
  async getArticleList(
    @Query() param: ArticleDto.GetArticleListDto,
  ): Promise<ListVo<ArticleVo>> {
    const result = await this.articleService.getArticleList(param);
    return new ListVo({
      size: result.size,
      list: result.list.map(article => new ArticleVo(article)),
    });
  }

  /**
   * 获取文章具体信息
   * @param param
   */
  @Get('get')
  async getArticle(
    @Query() param: ArticleDto.GetArticleDto,
  ): Promise<ArticleVo> {
    return new ArticleVo(await this.articleService.getArticle(param));
  }
}
